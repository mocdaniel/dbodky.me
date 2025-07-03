# Grafana Alloy

I use [Grafana Alloy](https://grafana.com/oss/alloy-opentelemetry-collector/) for collecting **metrics, logs**, and
**traces** from different parts of my Homelab.
Grafana Alloy is an open-source [Open Telemetry Collector Distribution](https://opentelemetry.io/docs/collector/distributions/)
by [Grafana](https://grafana.com) which allows for easy integration with Grafana Cloud and many prebuilt configurations
and integrations for common use-cases.

As I am using the free tier of Grafana Cloud for my homelab's observability stack, it's a great fit.

## Installing Grafana Alloy

Grafana Alloy currently runs on the following machines in my homelab, with the listed integrations:

| Node                                 | Integrations       |
| ------------------------------------ | ------------------ |
| [`olympus`](../inventory/olympus.md) | Linux Node, Docker |
| [`pandora`](../inventory/pandora.md) | Linux Node, Docker |

The local instances are provisioned on [Docker](../docker/index.md) by [Portainer](../portainer/index.md).

They onboard themselves into Grafana Cloud's **fleet management** feature for easy and
centralized configuration.

## Configuration

As mentioned above, all Grafana Alloy instances in my homelab are onboarded to Grafana Cloud's fleet management, which allows
for easy discovery, management, and centralized/remote config management.

For this, a minimal local configuration is available at `/etc/alloy/config.alloy` on each machine where Grafana Alloy is running.

In addition, the environment variables `GCLOUD_RW_API_KEY` and `GCLOUD_FM_COLLETOR_ID` need to be set for each Grafana Alloy
instance as they are used within the fleet management configuration. A reference Docker Compose stack can be found below.

## Integrations

### Linux Node

For the Linux Node integration, no additional configuration needs to be done.

### Docker Integration

For the Docker integration, Grafana Alloy needs to be able to run [`cAdvisor`](https://github.com/google/cadvisor) for
monitoring container statistics. This requires the Grafana Alloy containers to run in `privileged` mode and mount a few specific
volumes from the respective host:

## Docker Compose Stack

All Grafana Alloy instances utilize the same Docker Compose stack, with information like host names and instance IDs
provided via environment variables within [Portainer](../portainer/index.md).

Expand the annotations (1) for additional information for respective configuration options.
{ .annotate }

1.  This is an annotation!

``` yaml
services:
  alloy:
    command: > # (1)!
      run --server.http.listen.addr=0.0.0.0:12345
      --storage.path==/var/lib/alloy/data
      /etc/alloy/config.alloy
    container_name: alloy
    environment:
      GCLOUD_RW_API_KEY: ${PORTAINER_GCLOUD_RW_API_KEY} # (2)!
      GCLOUD_FM_COLLECTOR_ID: ${PORTAINER_HOST}.bodkys.house # (3)!
    hostname: ${PORTAINER_HOST}.bodkys.house # (4)!
    image: grafana/alloy:v1.8.1
    labels:
      traefik.docker.network: traefik_traefik # (5)!
      traefik.enable: true
      traefik.http.routers.alloy.entrypoints: websecure
      traefik.http.routers.alloy.rule: Host(`alloy-${PORTAINER_HOST}.bodkys.house`)
      traefik.http.routers.alloy.service: alloy
      traefik.http.routers.alloy.tls.certResolver: civo
      traefik.http.routers.alloy.tls.domains.0.main: alloy-${PORTAINER_HOST}.bodkys.house
      traefik.http.services.alloy.loadbalancer.server.port: 12345
      wud.link.template: https://github.com/grafana/alloy/releases/tag/$${transformed} # (6)!
      wud.tag.include: ^v\d+\.\d+\.\d+$$
    networks:
      - traefik_traefik
    privileged: true # (7)!
    restart: unless-stopped
    volumes:
      - /etc/alloy/config.alloy:/etc/alloy/config.alloy # (8)!
      - alloy-data:/var/lib/alloy/data # (9)!
      - /var/run/docker.sock:/var/run/docker.sock:ro # (10)!
      - /:/rootfs:ro
      - /var/run:/var/run:rw
      - /sys:/sys:ro
      - /mnt/docker/:/var/lib/docker:ro # (11)!

networks:
  traefik_traefik:
    external: true

volumes:
  alloy-data: {}
```

1.  The listen address for Alloy needs to be set to `0.0.0.0` explicitly. Otherwise, the debug UI won't be reachable from
    the outside.
2.  API key for Grafana Cloud Fleet Management, set in [Portainer](../portainer/index.md).
3.  Grafana Alloy instance ID, set to the respective host's FQDN in [Portainer](../portainer/index.md).
4.  Hostname needs to be set for the `constants.hostname` reference in the generated Grafana Alloy configuration
    to work, as Docker containers use their container ID as hostname by default.
5.  Reverse-proxying via [Traefik](../traefik/index.md) is configured via container labels.
6.  [What's up Docker](../wud/index.md) integration is configured via container labels.
7.  Needed for Grafana Alloy's [cAdvisor integration](https://grafana.com/docs/alloy/latest/reference/components/prometheus/prometheus.exporter.cadvisor/).
8.  Contains the Grafana Cloud Fleet Management config.
9.  Contains Grafana Alloy's local data, e.g. WAL.
10. All the mounts that follow are needed for Grafana Alloy's [cAdvisor integration](https://grafana.com/docs/alloy/latest/reference/components/prometheus/prometheus.exporter.cadvisor/) to work from inside the container.
11. Custom Docker `data-root` directory, see [Change Docker's data directory](../docker/data-root.md).
