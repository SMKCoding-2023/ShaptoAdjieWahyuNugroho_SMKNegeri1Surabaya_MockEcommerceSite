# Nuxt E-commerce Project
I made this cool e-commerce project thing for a Nuxt.js course I'm taking.

If you want to run it, you need to set up a Supabase database and make your own `.env` file with the following format:
```
SUPABASE_URL=https://[project id].supabase.co/
SUPABASE_STORAGE_URL=https://[project id].supabase.co/storage/v1
SUPABASE_API_KEYS=[anon/public api key]
SUPABASE_SECRETS_KEY=[service_role/secret api key]
SUPABASE_GET_STORAGE_URL=https://[project id].supabase.co/storage/v1/object/public/
```
Then you put the `.env` file in the root directory of this project (next to this README file).

You can then run it with `npm run dev`.
