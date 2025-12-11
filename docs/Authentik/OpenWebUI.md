# Setup Authentik with OpenWebUI

I followed the steps described here: https://integrations.goauthentik.io/miscellaneous/open-webui/
However, after finishing the steps my OpenWebUI instance was not running. The logs showed issues with the sqlite database. It seems columns that are required for OAuth to work are missing.

## Errors because of missing columns

1. user

   The user entity was missing the following columns:

   - api_key
   - oauth_sub

2. group
   The group entity was missing the following columns:
   - user_ids

Therefore, we need to add these columns to the `webui.db`.

## How to alter the database

First, backup your OpenWebUI database.

Retrieve the database

```sh
docker cp open-webui:/app/backend/data/webui.db ./webui.db
```

> Make sure you have a sqlite3 client installed.
> My OpenWebUI instance was running in a VM with as a docker compose stack.
> Therefore, I installed on my VM sqlite3 with `sudo apt-get install sqlite3`.

Alter the user table

```sql
ALTER TABLE user ADD COLUMN api_key TEXT;
ALTER TABLE user ADD COLUMN oauth_sub TEXT;
```

Alter the group table

```sql
ALTER TABLE "group" ADD COLUMN user_ids JSON;
```

Once finished, we must migrate all users. Go to your Authentik user dashboard and edit your OpenWebUI application.

Go to `Appications > Providers > Your OpenWebUI Provider > Preview`
In `Preview for User` select the user you want to migrate and copy in the `JWT Payload` the value of the `sub`.

In your webui.db, we must update for all users the `oauth_sub` field. The value must be prefixed with `oidc@`

```sql
UPDATE user SET oauth_sub = "oidc@<sub>" WHERE id = "<your-user-id>";
```

Afterwards, bring your changes back to the open-webui instance.

```sh
docker cp ./webui.db open-webui:/app/backend/data/webui.db
```

And restart your instance.

The steps are beautifully described in this blog:

- https://dannytsang.com/migrating-open-webui-users-to-authentik/
