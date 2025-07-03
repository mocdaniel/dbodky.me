# Expose the Docker Endpoint

By default, the Docker daemon can be interacted with using a local socket at `/var/run/docker.sock`.

In scenarios where applications external to the node need access to Docker (e.g. [Portainer](../portainer/index.md)),
a **TCP endpoint** can be configured in addition or as drop-in replacement, allowing for interaction with Docker
over the network.

## Preparations

Because Docker can do basically _anything_ on a system, it's important to secure the TCP endpoint against unauthorized
access. For doing so, Docker supports **mTLS** for authenticating parties involved in the communication.

Thus, the following things are needed:

- a **Certificate Authority** (_CA_)
- **Server Certificates** for the Docker daemon(s)
- **Client Certificates** for applications communicating with the Docker daemon(s)

### Creating the CA

!!! info

    In my homelab, I decided for the Docker CA to live on [`olympus`](../inventory/olympus.md), my management system.

A CA can be bootstrapped like this:

```sh
mkdir /etc/docker/ca && cd /etc/docker/ca
openssl genrsa -aes256 -out ca.key 4096
openssl req -new -x509 -days 1825 -key ca.key -sha256 -out ca.pem
```

This will create a CA key and certificate valid for **5 years**. A **secure passphrase** should be chosen for the CA key.
The information for the CA certificate can be answered to ones liking, but at least the **common name** (_CN_) should be
something meaningful, e.g. `Docker CA`.

### Creating Server Certificates

Next, the created CA can be used to generate the server certificates for the Docker daemon(s).

A server certificate can be created like this, e.g. for my Docker host [`pandora`](../inventory/pandora.md):

```sh
openssl genrsa -out pandora.key 4096
openssl req -subj "/CN=pandora.bodkys.house" -new -key pandora.key -out pandora.csr
echo 'subjectAltName = DNS:pandora.bodkys.house,IP:192.168.1.7,IP:127.0.0.1' > pandora.cnf
echo 'extendedKeyUsage = serverAuth' >> pandora.cnf
openssl x509 -req -days 365 -sha256 -in pandora.csr \
  -CA ca.pem -CAkey ca.key -CAcreateserial \
  -out pandora.pem -extfile pandora.cnf
```

A few things are noteworthy here:

- the _CN_ of the server certificate is set to pandora's **fully qualified domain name** (_FQDN_)
- the `subjectAltName` lists both, the FQDN as well as the IPs this machine is reachable on, as TCP connections can
  communicate via FQDN or IP
- the `extendedKeyUsage` specifies that this certificate may only be used for **server authentication**

### Creating Client Certificates

Finally, the created CA can beb used to generate client certificates for applications connecting to the Docker daemon(s).

A client certificate can be created like this, e.g. for [Portainer](../portainer/index.md) managing another
Docker host.

```sh
openssl genrsa -out portainer.key 4096
openssl req -subj '/CN=portainer.bodkys.house' -new -key portainer.key -out portainer.csr
echo 'extendedKeyUsage = clientAuth' > portainer.cnf
openssl x509 -req -days 365 -sha256 -in portainer.csr \
  -CA ca.pem -CAkey ca.key -CAcreateserial \
  -out portainer.pem -extfile portainer.cnf
```

Again, a few things are noteworthy:

- the _CN_ should be meaningful, but doesn't really matter here
- no `subjectAltNames` have been configured this time, as this certificate will never be used for _serving_ an application
- the `extendedKeyUsage` has been set to `clientAuth` accordingly

### Securing Certificates

After creating the certificates, **all of them** should be secured accordingly to prevent extraction or manipulation:

```sh
chmod 0400 *.key
chmod 0444 *.pem
```

## Configuring the Docker Daemon

Now that the certificates are created, the Docker daemon(s) can be secured, using the server certificate(s).

Move the **CA cert** as well as the Docker daemon's certificate **keys** and **certs** to the respective host(s) into
`/etc/docker/certs`, and configure Docker like below (again, [`pandora`](../inventory/pandora.md) is the example):

```json
{
  "hosts": ["0.0.0.0:2376", "unix:///var/run/docker.sock"],
  "tls": true,
  "tlsverify": true,
  "tlscacert": "/etc/docker/certs/ca.pem",
  "tlscert": "/etc/docker/certs/pandora.pem",
  "tlskey": "/etc/docker/certs/pandora.key"
}
```

Make sure to [secure the copied certificates](#securing-certificates) as described above.

!!! warning "Configuration in `docker.service`"

    In my case, there was configuration in `docker.service` that clashed with the `hosts` setting
    in `/etc/docker/daemon.json`.

    I had to remove the `-H` flag/values in `/var/lib/systemd/system/docker.service` and reload the service file using `systemctl daemon-reload`.
