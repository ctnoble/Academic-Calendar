# Alexa Skill Enterprise Template
An Alexa Skill starter project template that uses the [Alexa Skills Kit SDK for Node.js](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs) and follows the structure for the [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html). The basic folder structure is enhanced for enterprise projects where multiple developers are working on a skill project at the same time.

The following are used in this template:
- ASK CLI
- AWS
    - AWS CLI
    - Identity and Access Management (IAM)
    - Lambda
    - Simple Storage Service (S3)
    - CloudWatch
    - DynamoDB (recommended)



This template includes the following:
- Follows the structure of ASK CLI projects including default locations for the `.ask` folder and `config` file, code in the `lambda/custom` folder, a `models/en-US.json` file, and the `skill.json` file.
- Addition of the `.deploy-s3` folder where all assets (audio, video, images) can be synced to the skill's s3 bucket with an AWS CLI command.
- The `.vscode` folder includes configuration to be able to debug code locally using Bespoken Tools Proxy or to debug Mocha unit and end-to-end tests.
- The `lambda/custom/config` folder includes configuration files for each of the different environments and is a place where you can add additional values so they are not embedded in code.
- The `lambda/custom/modules` folder allows for a folder for each skill **feature** to group handlers, display helpers, translations, and services together. For each feature, create a folder following the `samples` example. The main folders are:
    - `core` - the basic handlers needed for every skill including Welcome, Goodbye, Help, Repeat, and Unhandled. The Version handler is also included to help confirm the version and environment of your running skill.
    - `samples` - a sample set of handlers to get you started and shows examples of display templates.
    - `shared` - this folder includes services, utilities, and translations that are used across features in the skill. Do not include handlers in this folder.
- `lambda/custom/index.js` - the entry point to the skill and where you register handlers and translations.
- The `lambda/test` folder contains a `unit` folder for unit tests and an `e2e` folder for end-to-end tests.
- Instead of a single **handler** file and **translation** file, these are separated into features so developers have less merge conflicts to deal with when checking in code.

## First-Time-Only Setup
1. Install [Node.js](https://nodejs.org/en/)
    - If you are only using Node.js for Lambda development, consider installing the [version of Node.js](https://nodejs.org/en/download/releases/) that matches the [supported Lambda version](http://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html) which is v6.10.3
    - Installing Node.js will also install Node Package Manager (npm)
2. Create an [Amazon Web Service account](https://aws.amazon.com/)
3. Create a user instead of the AWS account root user: [Creating Your First IAM Admin User and Group](http://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html) (save the .csv file locally)
4. Install AWS CLI: [Installing the AWS Command Line Interface](http://docs.aws.amazon.com/cli/latest/userguide/installing.html)
5. Configure AWS locally: [Quick Configuration](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)
    ```bash
    $ aws configure
    AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
    AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
    Default region name [None]: us-east-1
    Default output format [None]: json
    ```

6. Install [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html) and create and deploy a sample skill.

    ```bash
    $ npm install -g ask-cli 

    $ ask init
    $ ask new -n skill-name
    $ ask deploy
    ```
    see [ASK CLI Setup on YouTube](https://youtu.be/13-tCdh8Y_E)

7. Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
8. Install a code editor. The detailed steps will show you how to use [Visual Studio Code](https://code.visualstudio.com/) to debug your Node.js code locally.



## Environments
### LocalDev
Every developer needs a personal account on developer.amazon.com to use for local development. This personal account is the only one you will need to know the password for. If you require access to the developer accounts for Dev, Test, or Prod, your personal account can be associated with those accounts and all accounts will appear in a dropdown list in the top-right corner of the Developer console.

You will need access to a shared, non-production AWS account to deploy your lambda functions, S3 buckets, and DynamoDB tables. Assets in this environment should be suffixed with your developer name (ex: `ask-custom-myskillname-jsmith`)

Create an ASK CLI **profile** mapping your developer name (ex: `jsmith`) to your developer.amazon.com and the AWS account to be used for this environment.

### Dev
Only code that is code-reviewed should be deployed to the **Dev** environment. There is a single **Dev** login for the developer.amazon.com account, but developers should not be logging into this account directly. Instead, their personal account can be associated with the **Dev** account.

You will need access to a shared, non-production AWS account to deploy your lambda functions, S3 buckets, and DynamoDB tables. Assets in this environment should be suffixed with `dev` (ex: `ask-custom-myskillname-dev`)

If you need to deploy to **Dev**, create an ASK CLI **profile** mapping (ex: `dev`) to the **Dev** developer.amazon.com and the AWS account to be used for this environment.

### Test
There is a single **Test** login for the developer.amazon.com account, but developers should not be logging into this account directly. Instead, their personal account can be associated with the **Test** account.

You will need access to a shared, non-production AWS account to deploy your lambda functions, S3 buckets, and DynamoDB tables. Assets in this environment should be suffixed with `test` (ex: `ask-custom-myskillname-test`)

If you need to deploy to **Test**, create an ASK CLI **profile** mapping (ex: `test`) to the **Test** developer.amazon.com and the AWS account to be used for this environment.

### Prod
There is a single **Prod** login for the developer.amazon.com account, but developers should not be logging into this account directly. Instead, their personal account can be associated with the **Prod** account.

You will need access to the isolated production AWS account to deploy your lambda functions, S3 buckets, and DynamoDB tables. Assets in this environment should be suffixed with `prod` (ex: `ask-custom-myskillname-prod`)

If you need to deploy to **Prod**, create an ASK CLI **profile** mapping (ex: `prod`) to the **Prod** developer.amazon.com and the AWS account to be used for this environment.

## Project Setup
The skill template is your starting point. Once that is cloned, you will need to make sure that it is setup for the ASK CLI profiles for the different environments.

1. Clone project repository. You need to run `npm install` in both the `lambda/custom` and `lambda/test` folders.

    ```bash
    $ git clone --depth=1 http://52.8.67.233/alexa/alexa-skill-enterprise-template.git myskill

    $ cd myskill/lambda/custom
    $ npm install
    
    $ cd myskill/lambda/test
    $ npm install
    ```

2. In the `.ask/config` file you will see entries for the following profiles: dev, test, prod, and changeme.

    Each entry will look like this and will start with the profile name (ex: `dev`):

    ```json
    "dev": {
        "skill_id": "",
        "was_cloned": false,
        "merge": {
        "manifest": {
            "apis": {
            "custom": {
                "endpoint": {
                "uri": "ask-custom-skillname-dev"
                }
            }
            }
        }
        }
    }
    ```
    For each entry, change the **uri** so that `skillname` is replaced with the name of your skill. For dev, test, and prod, leave the prefix("ask-custom-") and suffix as is.

    There is also an entry named `changeme` :

    ```json
    "changeme": {
        "skill_id": "",
        "was_cloned": false,
        "merge": {
        "manifest": {
            "apis": {
            "custom": {
                "endpoint": {
                "uri": "ask-custom-skillname-changeme"
                }
            }
            }
        }
        }
    }
    ```
    As the first developer creating this project, add your userID (ex: `jsmith`) wherever `changeme` is located in the `.ask/config` file.

    Note that `skill_id` is currently blank. The first time you deploy a skill to a given profile, the ASK CLI will auto-fill the skill_id.

3. Deploy to LocalDev. At this point you should have already called `$ ask init` to set up a profile for your local development account (ex: `jsmith`) and the `.ask/config` file should have an entry for that profile.

    Now deploy the skill to that profile:

    ```
    $ ask deploy -p jsmith

    -------------------- Create Skill Project --------------------
    Profile for the deployment: [jsmith]
    Skill Id: amzn1.ask.skill.6c363aaa-97e8-4706-9682-52a3e7a09aaa
    Skill deployment finished.
    Model deployment finished.
    Lambda deployment finished.

    Your skill is now deployed and enabled in the development stage.
    Try invoking the skill by saying “Alexa, open {your_skill_invocation_name}” or simulate an invocation via the `ask simulate` command.
    ```

    Notice the Skill Id that was created. Go to the `.ask/config` file and notice that for the local dev profile there is now a skill_id.

4. Update the LocalDev `lambda/custom` config file. The skill code needs to know the Skill ID that was just created but when deployed it does not have access to the `.ask/config` file. To keep configuration values such as this from being hard-coded into the skill, there is a file for each environment under `lambda/custom/config`:    

    ```
    changeme.json
    dev.json
    local.json
    prod.json
    test.json
    ```
    Since this is the first time setting up the project, change the `changeme.json` file to match your profile name (ex: `jsmith.json`).

    The contents of the file should look like this:

    ```json
    {
        "env": "DEV-NAME dev",
        "region": "us-east-1",
        "appId": "skillID",
        "dynamoDBTableName": "",
        "s3BucketName": "voicexp-skill-template-nodejs-multimodal",
        "debugLocal": true
    }
    ```

    Copy the skill ID from the previous step and paste as the `appId` value in the local dev config file (ex: `lambda/custom/config/jsmith.json`). Also, change the `DEV-NAME` to the name of the developer:

    ```json
    {
        "env": "John Smith dev",
        "region": "us-east-1",
        "appId": "amzn1.ask.skill.6c363aaa-97e8-4706-9682-52a3e7a09aaa",           "dynamoDBTableName": "",
        "s3BucketName": "voicexp-skill-template-nodejs-multimodal",
        "debugLocal": true
    }
    ```

    Note that the `s3BucketName` is a default location and will be changed to a skill-specific bucket in a future step.

5. Now that the Skill ID is in config file for the local dev profile, we need to deploy just the lambda function:
 
    ```bash
    $ ask deploy -t lambda -p jsmith
    ```    
6. Test the deployment. Now that the skill is deployed, it is time to test it:

    ```
    $ ask simulate -l en-US -t "open template demo" -p jsmith

    ✓ Simulation created for simulation id: 70740e32-3f5f-4b09-b865-5b250fe5027c
    / Waiting for simulation response{
    "id": "70740e32-3f5f-4b09-b865-5b250fe5027c",
    "status": "SUCCESSFUL",
    "result": {
      ```

    The skill should show a "SUCCESSFUL" status.

7.  Customize the skill info and invocation name. You deployed the skill with the default template values. It is time to change those values for the skill that you are creating.

    Change the following values in the skill and model files:

    `models/en-US.json`

    | Key |  Description |
    |---|---|
    | invocationName | The name to use to invoke the skill (default: "template demo") |


    `skill.json`

    | Key |  Description |
    |---|---|
    | name | The name of the skill in the Skill Store |
    | summary | The short description in the Skill Store |
    | description | The long description in the Skill Store |
    | examplePhrases | The sample phrases to call the skill |
    | smallIconUri | url of small icon |
    | largeIconUri | url of large icon |
    | category | used for grouping skill in the Skill Store |

    Now re-deploy the skill:

    ```bash
    $ ask deploy -p jsmith
    ```    

    Once the skill is deployed, view the skill information in the Developer Console and if a value or checkbox has the wrong value, find and change it in one of the files above. That way all settings are checked into source control and can be replicated across environments.

## Configure Lambda
The first time a skill is deployed to an environment such as Local Dev (or dev, test, prod), go to the AWS console and find the Lambda function with the correct name and suffix.

1. In the **Environment variables** section, add the following entry:
    | Key |  Value |
    |---|---|
    | ENV | jsmith (or dev, test, prod) |

2. In the **Basic Settings** section
    - Change the timeout to 10 sec.
    - Consider increasing the Memory to 256 MB or 512 MB if the skill is slow to start.
3. Click the Save button.

When a skill in run/debugged/tested locally (outside of Lambda), the `lambda/custom/config/local.json` file is used for configuration. When running in Lambda, the value of the `ENV` environment variable determines which config file to use and if the environment variable is not set, then it defaults to local.

The skill template includes an intent for the version, so if you ask "What's the version?", you will know which config file is being used.

## Terminal Windows
Just a few notes about running commands in terminal windows for this project:
- **root** - all commands for the ASK CLI must be run from the root folder (location of the `skill.json` file).
- **lambda/custom** - when adding node packages to your skill, you must be in the `custom` folder (location of the `package.json` file)
- **lambda/test** - when adding node packages used to test your skill or running node scripts, you must be in the `test` folder (location of the `package.json` file)

VS Code allows you to open multiple terminal windows at once. Open one for each of the 3 folders above. You can rename each windows for easier identification by using the Command Palette to execute "Terminal: Rename"

## Debugging
The template is setup to be able to debug the skill code locally using VS Code and Bespoken Tools proxy. The `lambda/custom/package.json` includes `bespoken-tools` in the `devDependencies` section and their is already a VS Code launch profile name `Bespoken Proxy`.

1. Create a free developer account on [Bespoken Tools](https://apps.bespoken.io/dashboard/login).
2. In VS Code, click the Debug icon on the left and then run the `Bespoken Proxy` configuration.
3. In the DEBUG CONSOLE at the bottom, you will find a URL to the proxy between the Alexa Service and your code.
4. In the developer.amazon.com Developer Console, change the skill configuration/endpoints to point to the URL from the previous step and set the SSL certficate. See [this article](https://bespoken.io/blog/introducing-bst-proxy/) for additional hints.
5. Set a breakpoint in the "NewSession" or "LaunchRequest" handler in `lambda/custom/modules/core/handlers/coreHandlers.js`.
6. Use either an Echo device or the Testing section of the Developer Console to test your app. Launch the skill and see that the breakpoint is hit.

This [article](https://bespoken.io/blog/debugging-alexa-skills-vs-code/) describes the VS Code and Bespoken Tools integration.

## Unit Testing
Unit testing is for testing parts of a skill in isolation. The unit tests can be found in the `lambda/test/unit` folder.
### Terminal Window
In a terminal window that is in the `lambda/test` folder, run the command: 

```
$ npm run test:unit
```
The tests will run and the TERMINAL window will show which succeeded and which failed.

### VS Code
To debug into a test, set a breakpoint in the test file and from the DEBUG panel, select and then run the `Mocha - unit tests` configuration. The tests will run and the breakpoint will be hit.

## End-to-end Testing
End-to-end testing is for testing entire areas of a skill. The e2e tests can be found in the `lambda/test/e2e` folder.

### Terminal Window
In a terminal window that is in the `lambda/test` folder, run the command: 

```
$ npm run test:e2e
```
The tests will run and the TERMINAL window will show which succeeded and which failed.

### VS Code
To debug into a test, set a breakpoint in the test file and from the DEBUG panel, select and then run the `Mocha - e2e tests` configuration. The tests will run and the breakpoint will be hit.

## Other Folders
### AWS

The location of the  `.aws/credentials` file:

**Linux, OS X, or Unix**
```bash
~/.aws
```
**Windows**
```bash
%UserProfile%\.aws
```

The contents of the `credentials` file will look something like this:

```
[asu-uto-alexa-np]
aws_access_key_id=...
aws_secret_access_key=...

[asu-uto-alexa]
aws_access_key_id=...
aws_secret_access_key=...
```
For this example, the access key and secret have been truncated.

Avoid hand modifying this file.



### ASK
The location of the  `.ask/cli_config` file:

**Linux, OS X, or Unix**
```bash
~/.ask
```
**Windows**
```bash
%UserProfile%\.ask
```

The contents of the `cli_config` file will look something like this:

```
"dev": {
    "aws_profile": "asu-uto-alexa-np",
    "token": {
    "access_token": "...",
    "refresh_token": "...",
    "token_type": "bearer",
    "expires_in": 3600,
    "expires_at": "2018-03-12T21:48:42.508Z"
    },
    "vendor_id": "..."
},
"test": {
    "aws_profile": "asu-uto-alexa-np",
    "token": {
    "access_token": "...",
    "refresh_token": "...",
    "token_type": "bearer",
    "expires_in": 3600,
    "expires_at": "2018-03-07T22:45:12.341Z"
    },
    "vendor_id": "..."
},
"prod": {
    "aws_profile": "asu-uto-alexa",
    "token": {
    "access_token": "...",
    "refresh_token": "...",
    "token_type": "bearer",
    "expires_in": 3600,
    "expires_at": "2018-03-07T22:56:52.698Z"
    },
    "vendor_id": "..."
}

```
For this example, the token and vendor_id values have been truncated. You should also have a developer-specific entry in this file. If you don't have access to a given environment, then there will not be an entry.

Avoid hand modifying this file.



### Bespoken
The location of the  `.bst/config` file:

**Linux, OS X, or Unix**
```bash
~/.bst
```
**Windows**
```bash
%UserProfile%\.bst
```

The contents of the `config` file will look something like this:

```
{
    "sourceID": "silly-airplane",
    "secretKey": "...",
    "lambdaDeploy": {
        "runtime": "nodejs4.3",
        "role": "",
        "handler": "index.handler",
        "description": "My BST lambda skill",
        "timeout": 3,
        "memorySize": 128,
        "vpcSubnets": "",
        "vpcSecurityGroups": "",
        "excludeGlobs": "event.json"
    },
    "version": "1.2.8"
}

```
For this example, the secret key has been truncated. 

The sourceID makes up the public URL for accessing your local service when debugging through Bespoken Tools and each developer will have a unique name:

    https://silly-airplane.bespoken.link

Avoid hand modifying this file.
