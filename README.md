# GitHub Desktop access
* Copy the https clone link for this repository:
`https://F21-Team08-Williams-Miller-Hurst-Namiranian-Negron@dev.azure.com/F21-Team08-Williams-Miller-Hurst-Namiranian-Negron/F21-Team08-Williams.Miller.Hurst.Namiranian.Negron/_git/F21-Team08-Williams.Miller.Hurst.Namiranian.Negron`

* In GitHub Desktop, click "File" -> "Clone Repository" -> "URL" -> Paste the clone link
* Enter your @clemson.edu email in the Username field
* In Azure, click the User Settings icon in the top right to the left of your Microsoft account avatar, then click "Personal Access Tokens"
* Click "New Token", enter a name, and set the token to expire in 90 days.  Give the token full access.  Click "Create".
* Copy that token and use it as your password in GitHub Desktop

# Development procedures
Nuxt, the Vue framework we're using, supports hot-reloading in development mode.
To run in dev mode, clone the repo to your local machine and run `npm run dev`
in the `app` directory.  This will start a development server on 
`localhost:3000` by default. Any changes you make will appear live. Do keep in
mind that any data will actually still be data from the "production" server, so 
nuking stuff may have unforseen consequences.

# Build procedure
1. `npm run build`
2. `npm run start`
3. Hope it doesn't break
