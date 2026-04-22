<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Recurrly subscription management app. Here is a summary of all changes made:

- **`app.config.js`** (new): Created to replace static `app.json` for the Expo config, exposing `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` from `.env` via `Constants.expoConfig.extra`.
- **`.env`**: Added `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` values (covered by `.gitignore`).
- **`app/_layout.tsx`**: Imported `PostHogProvider` from `posthog-react-native` and wrapped the app tree to enable autocapture (touches) alongside the existing manual screen tracking.
- **`app/(auth)/sign-in.tsx`**: Added `user_sign_in_failed` on error, `posthog.identify()` + `user_signed_in` on success (both password flow and MFA verification flow).
- **`app/(auth)/sign-up.tsx`**: Added `user_sign_up_failed` on error, `posthog.identify()` + `user_signed_up` on successful email verification.
- **`app/(tabs)/settings.tsx`**: Added `user_signed_out` capture before sign-out and `posthog.reset()` after successful sign-out to clear the PostHog session.
- **`app/(tabs)/index.tsx`**: Added `subscription_expanded` / `subscription_collapsed` events when users tap subscription cards.
- **`components/CreateSubscriptionModal.tsx`**: Added `subscription_created` event with name, price, frequency, and category properties.
- **`app/subscriptions/[id].tsx`**: Added `subscription_details_viewed` event in a `useEffect` when the details screen mounts.

| Event | Description | File |
|---|---|---|
| `user_signed_in` | User successfully signs in | `app/(auth)/sign-in.tsx` |
| `user_sign_in_failed` | Sign-in attempt failed | `app/(auth)/sign-in.tsx` |
| `user_signed_up` | User completes registration | `app/(auth)/sign-up.tsx` |
| `user_sign_up_failed` | Sign-up attempt failed | `app/(auth)/sign-up.tsx` |
| `user_signed_out` | User signs out | `app/(tabs)/settings.tsx` |
| `subscription_created` | New subscription created | `components/CreateSubscriptionModal.tsx` |
| `subscription_expanded` | Subscription card expanded | `app/(tabs)/index.tsx` |
| `subscription_collapsed` | Subscription card collapsed | `app/(tabs)/index.tsx` |
| `subscription_details_viewed` | Subscription details screen opened | `app/subscriptions/[id].tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/391419/dashboard/1493319
- **Sign-up vs Sign-in Conversion Funnel**: https://us.posthog.com/project/391419/insights/zgjdYMNc
- **Daily Sign-ins and Sign-ups**: https://us.posthog.com/project/391419/insights/FbVRzXXX
- **Subscriptions Created Over Time** (by category): https://us.posthog.com/project/391419/insights/tiVuavfY
- **Auth Failure Rate**: https://us.posthog.com/project/391419/insights/YPxPye6G
- **User Churn Signal — Sign-outs Over Time**: https://us.posthog.com/project/391419/insights/xZZUnw1a

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
