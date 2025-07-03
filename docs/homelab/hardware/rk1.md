# TuringPi RK1 SBC

Along with a few [Raspberry Pis](./rpi.md) I am running [TuringPi RK1 SBCs](https://turingpi.com/product/turing-rk1/?attribute_ram=32+GB) in my homelab. They sit on top of a shared cluster board, also manifactured by Turing Pi.

They run either [Talos Linux](https://talos.dev) as Kubernetes nodes or a version of **Ubuntu 24.04 LTS** [patched for the Rockchip](https://github.com/Joshua-Riek/ubuntu-rockchip) as Docker host(s).

## Specifications

| Spec                 | Value        | Notes                                |
| -------------------- | ------------ | ------------------------------------ |
| **Architecture**     | `armv8`      |                                      |
| **Cores**            | 8            | 4x ARM Cortex-A76, 4x ARM Cortex-A55 |
| **Memory**           | 32GB         | LPDDR4                               |
| **eMMC Storage**     | 32GB         | eMMC 5.1, SD 3.0                     |
| **External Storage** | 1TB NVMe SSD |                                      |

## Machines

The following machines are present in my homelab:

| Hostname   | IP             | Usage                             |
| ---------- | -------------- | --------------------------------- |
| `turing-1` | `192.168.1.11` | [Talos Node](../talos/index.md)   |
| `turing-2` | `192.168.1.12` | [Talos Node](../talos/index.md)   |
| `turing-3` | `192.168.1.13` | [Talos Node](../talos/index.md)   |
| `pandora`  | `192.168.1.7`  | [Docker Host](../docker/index.md) |

## Notes and Misc

### Setting the Hostname

When installing **Ubuntu 22.04 LTS** using the image provided by TuringPi, the hostname will be `ubuntu` by default.

It can be updated like this, e.g. for `pandora.bodkys.house`:

```sh
sudo hostnamectl set-hostname pandora.bodkys.house --static
sudo hostnamectl set-hostname pandora-bodkys.house --transient
sudo hostnamectl # check new config
```

In addition, the new hostname should be added to `/etc/hosts`:

```
127.0.0.1 pandora.bodkys.house
```

Finally, the `cloud-init` config needs updating by editing `/etc/cloud/cloud.cfg`:

```yaml
# /etc/cloud/cloud.cfg
preserve_hostname: true # this will prevent cloud-init from restoring the old name
```

Changes can be validated by rebooting the machine.
