# telegram-web-service

## local development

For local development create .env.local file and provide the values for WEB_SERVICE_1, WEB_SERVICE_2.

## production build

For production build create .env.production file and provide the values for WEB_SERVICE_1, WEB_SERVICE_2 and then build the app:

```console
pnpm run build
```

Then you can deploy the "dist" folder.
