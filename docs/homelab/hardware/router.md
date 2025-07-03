# Router

As router I am using the [FRITZ!Box 7583](https://fritz.com/produkte/fritzbox/fritzbox-7583/) provided by my ISP, as most German providers don't support BYOD very well.

## Specifications

| Spec           | Value       | Notes                                                   |
| -------------- | ----------- | ------------------------------------------------------- |
| Uplink Speed   | `100Mbit/s` |                                                         |
| Downlink Speed | `500Mbit/s` | Due to bad wiring within the house, more like 380Mbit/s |
| LAN Ports      | `5`         | 1Gbit/s speed on each port                              |

## DHCP

The router takes care of DHCP within my intranet. Currently, there exist no separate networks e.g. for applications
I run at home, IoT devices, or mobile devices for every day use.

The settings **for IPv4** are configured as below:

| Setting                 | Value                              |
| ----------------------- | ---------------------------------- |
| **Gateway Address**     | `192.168.1.1`                      |
| **Subnet Mask**         | `255.255.255.0`                    |
| **DHCP Address Pool**   | `192.168.1.100` -> `192.168.1.200` |
| **DHCP Lease Validity** | `10 days`                          |

!!! info "IPv6 Settings"

    I currently do not actively use IPv6 within my homelab. Thus, the DHCP settings for IPv6 are left in their
    default state.

## DNS

As I run [AdGuard](../adguard/index.md) in my homelab, the router is configured to point to AdGuard as advertized DNS
server. It is available at `192.168.1.3`, with the fallback set to Google's DNS service at `8.8.8.8`.

## Port Forwarding

The router supports port forwarding for easier access to selected services from anywhere. Below is a list of ports
currently forwarded:

| Host                         | Port    | Purpose          |
| ---------------------------- | ------- | ---------------- |
| [`pandora`](rk1.md#machines) | `25565` | Minecraft Server |

## Notes and Misc
