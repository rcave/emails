# DEVUMI EMAIL WORKFLOW

![alt text](https://github.com/Devumi/emails/blob/master/EmailWorflow.png "Logo Title Text 1")

## Getting Started
#### 1. Install dependencies

This workflow requires the following dependencies:

- Node.js
- Gulp.js (Install with `npm install gulp`)
- livereload - Chrome Extension


#### 2. Clone this repository

```
git clone https://github.com/Devumi/emails.git
cd emails
```

#### 3. Install packages

```
npm install
```

#### 4. Start build

```
gulp
```

The compiled and inlined output email will be in the `build/` directory.

## How to use

#### Creating templates

[Nunjucks](https://mozilla.github.io/nunjucks/) is used for compiling template files to HTML.

Templates are stored in `src/templates/**` and partials in `src/templates/**/partials`. To create a template, create a file in the templates directory with the `.nunjucks` file extension.

NOTE: (** is the file directory for the email project).

To include a partial in your template, use the following syntax -

```
{% include "partials/PARTIAL_FILE_NAME.nunjucks" %}
```

To define a block of dynamic content to be replaced by the email file, use the following syntax -

```
{% block CUSTOM_BLOCK_NAME %}{% endblock %}
```


#### Creating emails from templates

To create an email based off a template file, create a new file in the `src/emails/**` directory (also with the `.nunjucks` file extension). Where ** is the file directory for the email project.

Specify which template to use using the following syntax -

```
{% extends "**/TEMPLATE_NAME.nunjucks" %}
```
^ where ** is the file directory for the email project.

To define the contents of a dynamic content block, use the following syntax -

```
{% block CUSTOM_BLOCK_NAME %}
Content goes here
{% endblock %}
```

#### CSS

SASS files are stored in the `src/sass/**` directory.

NOTE: (** is the file directory for the email project).

- `inline.scss` for styles to be inlined to their elements

You can create subdirectories within the SASS folder to hold any partials. Make sure to precede the name of a partial with an underscore, e.g. `_reset.scss`.

#### SENDING EMAILS

Email Sandbox is currently setup using Mailgun.

Mailgun Credentials: rudy@bytion.co | bytion123

NOTE: emails can only be sent to authorized recipients.
To authorize a recipient:
* Navigate to https://app.mailgun.com/app/account/authorized
* Login using credentials above
* Enter email you would like to receive test emails to
* A confirmation email is sent to the email address added.
* Accept the ability to receive emails in the confirmation email
* Update gulpfile.js mailgun task - Sender, Recipent, and Subject
