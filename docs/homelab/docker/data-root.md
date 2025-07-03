# Change Docker's Data Directory

Because my [TuringPi RK1s](../hardware/rk1.md) only have 32GB of storage space, [Docker](https://docker.io) is configured
to use an alternative `data-root` to store **volumes, container runtime data, filesystems of the containers** etc.

For this, the NVMe SSD available for each Talos node is mounted at `/mnt/docker`.

## Mounting the SSDs

The NVMe SSDs can be initially mounted like this:

```sh
lsblk
NAME         MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
mmcblk0      179:0    0  29.1G  0 disk
├─mmcblk0p1  179:1    0   512M  0 part /boot/firmware
└─mmcblk0p2  179:2    0  28.6G  0 part /
mmcblk0boot0 179:32   0     4M  1 disk
mmcblk0boot1 179:64   0     4M  1 disk
nvme0n1      259:0    0 931.5G  0 disk
└─nvme0n1p1  259:1    0 931.5G  0 part

mkdir -p /mnt/docker
mount /dev/nvme0n1p1 /mnt/docker

lsblk
NAME         MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
mmcblk0      179:0    0  29.1G  0 disk
├─mmcblk0p1  179:1    0   512M  0 part /boot/firmware
└─mmcblk0p2  179:2    0  28.6G  0 part /
mmcblk0boot0 179:32   0     4M  1 disk
mmcblk0boot1 179:64   0     4M  1 disk
nvme0n1      259:0    0 931.5G  0 disk
└─nvme0n1p1  259:1    0 931.5G  0 part /mnt/docker
```

To persist this mount across reboots, restarts, etc., the configuration gets persisted in `/etc/fstab`:

```
# /etc/fstab
UUID=d19c17e0-6ac9-48a3-a116-3ffd1099d163 /mnt/docker   ext4    defaults        0       2
```

!!! info "Partition UUID"

    The partition UUID can be found using `blkid`:

    ```sh
    blkid /dev/nvme0n1p1
    /dev/nvme0n1p1: UUID="d19c17e0-6ac9-48a3-a116-3ffd1099d163" BLOCK_SIZE="4096" TYPE="ext4" PARTUUID="8f338872-881e-2e44-817a-680e84341a1c"
    ```

Correctness of the changes can be tested by issuing `mount -a` before restarting the server to see if it _actually_ works.

## Configuring Docker

Next, the Docker daemon's config can be configured to use this dedicated directory. It is located at `/etc/docker/daemon.json`.

```json
{
  "data-root": "/mnt/docker"
}
```

!!! warning

    In some cases, `/etc/docker/daemon.json` doesn't exist and needs to be created first.

Finally, the Docker daemon needs to be restarted to pick up on the changes:

```sh
sudo systemctl restart docker
docker info | grep Root
  Docker Root Dir: /mnt/docker
```

## Moving Existing Data

In case you already ran Docker containers on the host before changing the `data-root` setting, you might probably
want to move existing data over to the new directory, **especially volumes**.

To do so, stop the Docker daemon, move the contents of `/var/lib/docker`, and start Docker again.

```sh
sudo systemctl stop docker
sudo mv /var/lib/docker/* /mnt/docker
sudo systemctl start docker
```
