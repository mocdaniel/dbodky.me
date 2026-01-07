---
author: daniel
pubDate: 2025-02-23T19:00:00.000+01:00
readTime: 5
tags:
  - homelab
title: Configuring SAML Authentication for Omni with Authentik
excerpt: A short write-up on how to configure SAML authentication for the Kubernetes management portal Omni using Authentik.
---

[Omni](https://omni.siderolabs.com) is a Kubernetes management platform for
[Talos-based](https://talos.dev) Kubernetes clusters that is available via a
Business Source License which allows free installations in non-production environments.
This makes it a perfect fit for powering my homelab's Kubernetes environment.

When setting up, I noticed that Omni supports SAML-based authentication, but only provides
documentation for a few selected providers:

- Auth0
- Workspace ONE
- Okta
- Entra ID
- Unify Identity Enterprise
- Keycloak

I am running [Authentik](https://goauthentik.io) as IAM provider in my homelab, and thus had
to do some research in order to find a working configuration. After talking to other community
members in the Talos Slack community, I decided to document the needed steps.

> [!NOTE]
> I am not an expert on the SAML authentication protocol, and ended up with my
> current (working) setup by trial-and-error. Please follow this guide at your own risk, and
> second-guess the discussed configuration steps. **Feel free to provide feedback in the comments.**

## Step 1: Create the Neccessary Property Mappings for Omni in Authentik

Omni utilizes a few specific **property mappings** from the IAM in use to manage users on its
platform. I had to create these mappings from scratch, as I couldn't get the setup up and running
with Authentik's default mappings.

Create the following mappings from the Authentik admin interface
(in `Customization > Property Mappings`):

- **Email mapping:**
  - **Name**: `email`
  - **SAML Attribute Name**: `email`
  - **Friendly Name**: `Email`
  - **Expression**: `return request.user.email`
- **First Name mapping:**
  - **Name**: `firstName`
  - **SAML Attribute Name**: `firstName`
  - **Friendly Name**: `First Name`
  - **Expression**: `return str.split(request.user.name, ' ')[0]`
- **Last Name mapping:**
  - **Name**: `lastName`
  - **SAML Attribute Name**: `lastName`
  - **Friendly Name**: `Last Name`
  - **Expression**: `return str.split(request.user.name, ' ')[1]`

## Step 2: Configuring a SAML Provider for Omni in Authentik

First, a [Provider](https://docs.goauthentik.io/docs/terminology#provider) for SAML
authentication with Omni needs to be created from the Authentik admin interface.

1. When asked for the provider's **type**, choose **SAML Provider** from the list
2. Set the **ACS URL** to `https://<your-omni-domain>/saml/acs`.
3. Set the **Issuer** to e.g. `authentik`.
4. Set the **Service Provider Binding** to `Post`.
5. In **Advanced Protocol Settings**, set the following:
    1. Enable **Sign assertions**.
    2. Select the **Property Mappings** `email`, `firstName`, and `lastName` you created
       in step 1.
    3. Set the **NameID Property Mapping** to `email`.
    4. Set the **Digest Algorithm** to `SHA256`.
    5. Set the **Signature Algorithm** to `RSA-SHA256`.

Save the provider, and open it in the Authentik admin interface. Copy the **download URL** from
the **Related objects** section and note it down for configuring Omni later on. That's it.

## Step 3: Configuring an Application for Omni in Authentik

Next, an [Application](https://docs.goauthentik.io/docs/terminology#application) for
SAML authentication with Omni needs to be created from the Authentik admin interface.

1. Choose a **name** and **slug** that works for your setup.
2. Select the **provider** you created in step 1.
3. In the UI settings, set the following:
    1. Set the **Launch URL** to `https://<your-omni-domain>`
    2. Set the **Icon** to `https://raw.githubusercontent.com/siderolabs/omni/65244f67c7d8f30b7a146a48ab5514b39fd49d07/frontend/favicon.ico`

Save the Application, that's it.

## Step 4: Configure Omni

For configuring Omni, I mainly followed the official guide on
[running Omni on your own infrastructure](https://omni.siderolabs.com/how-to-guides/self_hosted/index).

The following flags need to be adjusted:

- `--auth-saml-enabled=true`
- `--auth-saml-url=<authentik-metadata-url>`

The `<authentik-metadata-url>` is the one you copied in step 2 after creating the provider.

This is all that needs to be done for Omni to use Authentik for SAML authentication. Let me know
if the setup works for you, and have fun exploring Omni!