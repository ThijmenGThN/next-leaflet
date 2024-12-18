
# next-leaflet

![preview](https://i.imgur.com/oulW1VO.png)

An optimized tech stack for efficiency, an all-in-one solution to quickly build modern web apps.



### Powered by

- [NextJS](https://nextjs.org)
- [Payload](https://payloadcms.com)



### Features

- [Database](https://payloadcms.com/docs/database/overview)
- [Authentication](https://payloadcms.com/docs/access-control/overview)
- [Storage](https://payloadcms.com/docs/upload/overview)
- [Localization](https://payloadcms.com/docs/configuration/localization#locales)



### Includes

- [Tailwind](https://tailwindcss.com)
- [Gravatar](https://gravatar.com)
- [Heroicons](https://heroicons.com)
- [HeadlessUI](https://headlessui.com)



> Everything from this point on has been copied from branch "pocketbase" and has to be reworked !

## Getting Started

<details><summary>Development</summary>

### Dependencies

- Install docker and docker compose.
    
    - Windows: [Docker Desktop](https://www.docker.com/get-started/)
    - Linux: [Guide from Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-22-04)
    - Ubuntu >20.04: [Guide from Thijmen Heuvelink](https://wiki.thijmenheuvelink.nl/linux/install-docker)

### Development

> Ensure that you've [cloned](https://git-scm.com/docs/git-clone) the repository and are on the correct path. 

#### Start

``` docker compose up ```

The stack is now accessible on your preferred browser at http://localhost:3000, the pocketbase interface can be found at http://localhost:3000/pb/_/

#### Stop

To stop the stack from running simply execute the ` CTRL + C ` shortcut.

</details>



<details><summary>Production</summary>

### Preparation

1. Create a ` .env ` file:
   - Locate the ` .env.sample ` file in your project directory.
   - Duplicate or copy the contents of this file.
   - Rename the duplicate or copied file to ` .env `. 

2. Configure the environment variable:
   - Open the ` .env ` file in a text editor.
   - Locate the line that defines the ` PRODUCTION ` variable.
   - Set the value of ` PRODUCTION ` to ` "true" ` (include the quotes).

### Production

#### Start

> Unlike in the development steps we now add the  ` -d ` flag which makes the service run in the background.

``` docker compose up -d ```

The stack is now accessible on your preferred browser at http://localhost:3000 or on a differently defined port as stated in the `.env` file, the pocketbase interface can be found at http://localhost:3000/pb/_/



#### Stop

``` docker compose down ```

</details>



## Fundamentals

<details><summary>Install Node Packages</summary>

#### Install

``` docker compose exec next npm i -D <package> ```

#### Remove

``` docker compose exec next npm r <package> ```

</details>

> ` NPM ` ` Modules `


<details><summary>Next Navigation API</summary>

Instead of using `next/navigation` you should opt for the helper at ` @helpers/navigation `, this is a replacement required by ` next-intl ` it offers the same functionality.

</details>

> ` Link ` ` useRouter ` ` Redirect ` ` usePathname `


<details><summary>Accessing Pocketbase</summary>

Pocketbase has a client executable, below is an example that outputs all available commands. You can learn more on how to use it [here](https://pocketbase.io/docs).

``` docker compose exec pocketbase pocketbase --help ```

</details>

> ` CLI `


<details><summary>Schema Snapshots</summary>

Executing the following will generate a schema snapshot in ` src/backend/migrations `, note that this process does not save any collection data.

``` docker compose exec pocketbase pocketbase migrate collections ```

</details>

> ` Pocketbase ` ` Migrations `


<details><summary>Gravatar</summary>

This helper allows you to easily obtain an image URL from an email address using Gravatar API.

#### Implementation

1. Import the helper into your route.

    ```tsx
    import gravatar from '@/helpers/gravatar'
    ```

2. Obtain the avatar from gravatar.

    ```tsx
    const avatar = gravatar('next@leaflet.app')
    ```

    This will return a URL from the Gravatar API which is an image. Here's an example result: ` https://www.gravatar.com/avatar/372...ba9?s=200&r=g&d=identicon `

3. (Optional) You can also choose the avatar style.

    ```tsx
    const avatar = gravatar('next@leaflet.app', 'identicon')    
    ```

    You can choose between the following avatar types:

    `identicon` `monsterid` `wavatar` `retro` `robohash`

    _The default icon style is `identicon`_

#### Example

Here's an example of how you can use the Gravatar helper in your code. It is recommended to add a fallback image in case Gravatar doesn't return anything or to display while Gravatar is still loading.

```tsx
import gravatar from '@/helpers/gravatar'

export default function Page() {

    const [avatar, setAvatar] = useState<string>('<fallback_url>')

    // This'll run once when the page loads. 
    useEffect(() => {
        setAvatar(gravatar(user.email))
    }, [])

    return (
        <>
            <Image src={avatar} alt="" />
        </>
    )
}
```

</details>

> ` Helpers ` ` Avatars `



## Extras

<details><summary>Continuous Integration</summary>

### Preparation

> The workflow has been set up to connect to any VPS via SSH as defined in the Repository Secrets.

1. Install docker and docker compose on your VPS.
    
    - Windows: [Docker Desktop](https://www.docker.com/get-started/)
    - Linux: [Guide from Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-22-04)
    - Ubuntu >20.04: [Guide from Thijmen Heuvelink](https://wiki.thijmenheuvelink.nl/linux/install-docker)

2. Setup a Runner on GitHub

    1. Create a new Runner
    
        - Navigate to ` Settings > Actions > Runners `

            > To set up a new self-hosted runner, follow the instructions provided by GitHub to configure the runner to listen for jobs. It is advisable to install it as a service.

    2. Define environment variables
    
        - Navigate and create new secrets in `Settings > Secrets and variables > Actions`

            Name|Expects|Description
            -|-|-
            SSH_KEY|Private Key|Generated private ssh-key which will beused    to access the VPS.
            SSH_HOST|IP Address|The address of your VPS that runs theGitHub    Actions Runner.
            SSH_USER|Username|System user which should be utilized for deployments.
            SSH_PORT|Port Number|The port that will be used to connectwith     the VPS, default is 22.
            APP_ENV|Environment|Contents of the ` .env ` file withadjusted     values for deployment.

### Activation

Define the branch in `.github/deploy.yml` and modify it from being ` disabled ` to an existing branch. Any modifications made to that particular branch will automatically trigger the Action, deploying your stack to your VPS.

</details>