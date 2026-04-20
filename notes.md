



# 4:40 JS talks directly to native code through JSI:
'-modules load on demand instead of loading on startup'
-the rendering layer syncs with react own update cycle
# -react native 5:14 is a runtime but we ll build with expo
 If ur re usued to next js with React or Next with Vue or Tanstack 
 
# Expo is the framework layer on top of React Native
    -it handles ur dev environment 
    -ur routing
    -ur build 
    -ur deployments
    - React Native gives u the engine 
        And Expo gives u the car
    -Expo is the official reocmmended way to build React Native apps 5:50
    - u just run one command and u hve a working app on ur phone 

# 6:30 Expo handles **native dependencies for you**
        **camera, apps, notifications, biometrics**

# 6:30 **File based routing**
    - you create a file and it becomes a screen
    - Nested Folders become Nested Routes
    - Dynamic segments starts with []
 
# 6:46 Expo will give you the easiest path from making** 
    -the app run on ur phone all the way to making the app live on the appstore
    =>that path is called **EAS Expo application Services**
    Eas helps u ship ur app
    **Eas build compiles ur app in the cloud**
        No mac needed for ios builds
        **EAS submit sends it to appstore or google paly with one cmd**
        **EAS update lets you push fices directly to users devices without going to store review**
        7:30 EAS workflow : auto build, sign and submit ur app directly from github repo
        7:40 Expo observe to measure real users metrics like launch time and app responsiveness
            =>with this u can fully automate ur release process abd track 
                exactly how ur app performs for real users in production

# 8:20 setting up same tools that companies use:**
    -to auth users,track behaviors and catch bugs before ur users do

# 8:50 CLERK for auth and billing**
    -handles sign-up, in , user management and session handling
    - 9:15 use of **Clerk Custom Offlow with Expo**            
    -9:18 set up secure auth, amange user sessions and handle the entire experience
    - Clerk just launched native components for EXPO
    - essentially 9:30 pre built UI that renders using SWIFT UI on IOS and JETPACK COMPOSE on ANDROID
    - 9:50 use of **CLERK for BILLING** learn how to set up subscription plans, manage payments and enforce plan limits
        
# 10:13 POSTHOG for analytics and exploration
    - u need to know what ur users are actually doing 10:22 
    - which screen do they visit
    - we ll integarate the react native SDK and use it as a single tool for understanding user behavior
    - we ll set up event tracking to see which subscriptions users add most
    - 10:45 Funnel analyses ro measure how many users complete onboarding
    - 10:48 feature flags to roll out nea feature to a % of users before going live
    - Air tracking to catch crashes the moments they happen 10:55
    - 11:00 session replay on mobile
    - 11:08 if you want direct feedback u can trigger in app surveys after key moments

# 11:27 CodeRabbit USE

ALL IN ALL:
# 12:38 EXPO and EAS handles ur Development and Deployment
# Clerk Handles AUTH and Billing
# POSTHOG ahndles analytics and experimentation
# COdeRabbit handles code quality

# 13:15 CRASH COURSE oF ReactNATIVE
- 13:55 coding in RN u will use JS same as react
- instead of rendering html elements u wll render native mobile components
- 14:15 <Text> </> : dispaly text in the app 14:55
- 15:00 StyleSheet utility : define styles by writing a single JS object
- 15:10 tailwind css =>native wind allowing u to write taiwlind like css styles in RN
- <View></> 15:30: box holding other components similar to <div></>
  - often used to create layout structures for other components
  - uses flexbox layout by default 15:56 making it rly easy to control how the childrenc components r laid out

- Interactivity to ur RN apps 16:12
  - A/ 16:25 Touchable Opacity : cousin to react button component
    - instead of Onclick => ur pressing it
  - B/ Touchable Highlight which allow views to respond to touch in a unique way
    - when touched the component reduce the opacity of the wrapped div revealing the underlying color
  - C/ Touchable without feedback 17:02 u dnt want to hve any visual feedback when pressed
  - D/ Activity Indicator = >allowing u to show a spinner or a loading indicator within ur app
  - E/ 17:48 Flatlist rendering a longList of items that need to be scrolled
    - like the mapfuction in react
    - some extra feature like Optimized Scroll performance and Item Separation 18:10
      <View>
        <FlatList
            data={DATA}
            renderItem= {({item})}=>{ //allowing u to define how u wana represent each item in the array
            }
            >
        </FlatList>
      </View>
    - when should u use a flatlist or when should u map only over the elements 18:38
        -LargerLISt =>Flatlist
        -Smaller List=>mapList
  
  - F/ ScrollView 18:50 multiple components providing u a scorlling container for them

  - G/ 19:20 SafeAreaView Safe Zone wo wrap ur apps content within without being covered by the device HW features
    sometimes it fails 20:00 so => a package installed REACT NATIVE SAFE AREA CONTEXT

 
  - H/ 20:25 Display images in RN
    <Image > Component 
        - Display an image as a background : 
            <ImageBackground> : specifically designed to allow other components to be laid on top of it
    Both of the above component dnt support SVG files bcs of some native rendering limitations
    =>3rd party packet: React native SVG

  - I/ Modals 21:25 <Modal>
  - J/ Alert 21:41 <Alert> 21:47
  - 21:55 Forms <Switch>
                create a state for it
                a func that manages it
                call it withinh ur JSX, provide some colors, its value, what happens when u click on it

  - 22:20 Status Bar



  # 24:00 Project Setup

  ## REACT NATIVE.dev 24:30
  ## Expo.dev 25:10
    26:30 Creating the project @expo.dev under ahmad.vbe@gmail.com A@1234
    27:34 create expo app in ur visual studio terminal 
        npx create-expo-app@latest --template default@sdk-54 ./
    29:00 npx expo start to start the development server
    29:20 open the app on ur phone by scanning the QR code with the expo

  ## FILES generated: what has expo generated for us 31:18
    - package.json
    - 31:58 app.json : expos config files  
    - 32:20 tsconfig.json : typescript config file, extends the expos base TS config
    - 32:45 package-lock.json : npm lock file
    - 32:50 node_modules
    - 32:55 scripts folder
    - 33:00 assets folder
    - the real code lives in the app folder 33:10
        containing all the different routes
            rn-recurly-me/app/_layout.tsx : root layout wrapping all of ur screens
            rn-recurly-me/app/(tabs)/index.tsx 33:33 1st thing users see 
            rn-recurly-me/app/(tabs)/explore.tsx: Explore Page 33:40

    - rn-recurly-me/components 33:45 all the components and reusable pieces of UI 34:05

## 34:10 clean our project using one of the scripts within package.json
    npm run resset-project 
                    =>35:00 fully empty version of our app
                    => Starting point 


### Styling 35:24 SET UP Styling
    - we will use Tailwind CSS for styling our app
    - 35:40 NativeWind is a package that allows us to write Tailwind CSS styles in React Native
    - 35:49 Nativewind.dev install native wind and its dependencies
    - 36:20 install nativewind and its dependencies
        Nativewind V5 : https://www.nativewind.dev/v5/getting-started/installation
              npx expo install nativewind@preview react-native-css react-native-reanimated react-native-safe-area-context
      2. Setup Tailwind CSS
        npx tailwindcss init -pnpx expo install --dev tailwindcss @tailwindcss/postcss postcss
        37:27 Add Tailwind to your PostCSS configuration
        37:45 Create a global.css file and add the Tailwind directives.
      3. Create or modify your metro.config.js 38:12


    43:00 Theme for our app
      Figma design => global.css


# 45:20 Routing and Navigation of our APP
  routing with expo router works as the routing with Next js 
    every file in the app folder becomes a route/part of the nav tree 45:40
    - app/index.tsx => / routeour root route isnt the full home screen
      =>its an entry point hat decides where a user goes 
        back in our app/index.tsx is the starting route
        
## 46:04 on boarding screen addition
    app/onboarding.tsx. / rnfe =>spinup a new functional component with a view and a text component inside it
    46:35 test it by adding a link to it from the index.tsx file

## Route group 48:00
  lets you organize ur routes without affecting the url structure /witout adding that folder name to URL
    the following routes will resolve directly to app/sign-in and app/sign-up instead of app/(auth)/sign-in and app/(auth)/sign-up
    48:30 app/(auth)
      48:35 app/(auth)/sign-in.tsx 48:50 
      49:05 app/(auth)/sign-up.tsx

## 51:30 LAYOUTS
  each layout adds its own header 51:50
  root layout wraps all the routes
  create a layout specifically for the auth group to wrap the sign-in and sign-up pages 52:00
    app/(auth)/_layout.tsx
  

## Tabs 53:36 bottom tab navigation -- note that the auth screens dnt need the bottom navigationn -- ur main app screens will be within the
    app/(tabs)
      54:10  3 pages to be implemented
            app/(tabs)/subscriptions.tsx
            app/(tabs)/insights.tsx
            app/(tabs)/settings.tsx
      54:40 Not to forget the home screen *app/(tabs)/index.tsx*
  
## 55:30 Dynamic Routes 
  so if you nee a subscription Details screen u dnt want the tab bar to be shown on the page
    ==>we wana create it outside the tabs folder as a dynamic route 55:45
      app/subscriptions/[id].tsx 56:25

## COntent issue boundary 58:15
  58:30 make sure to use a safe area view toc ontain all the content of the app to avoid any issues with the notches and the different screen sizes

# 4 different types of navigation in our app:
  - Stack Navigation : for the auth flow
  - Tab Navigation : for the main app screens
  - Drawer Navigation : for the settings screen
  - Modal Navigation : for the subscription details screen
# 4 CONCEPTS TO POWER THE ENTIRE NAV OF THIS APP 58:40 which is build direclty through folders and files
  -FILES to create routes and it becomnes a screen
  -ROUTE GROUPS to organize screens without chnaging the url and parentheses to keep things clean
  -LAyout letting mutilple screens share the same nav parent 
  -the bottom tabs nav allowing to move between pages
  -the dynamic routes [] that let one file ahndle many detailed pages

# 59:50 GITHUB 

# 1:02:00 CODERABBIT

# 1:03:30 Connect with a bottom Tab Navigation
  just like we define the root stack inside the layout.tsx
  layout to be created specifically to the tabs group 1:03:50
    app/(tabs)/_layout.tsx
      <Tabs> 
        <Tabs.Screen> for each screen in the tab navigation
          and we hve a tabs arrray that has the name of the screen and the icon to be shown in the tab bar

# 1:07:40 ASSETS IMPORT
# 1:08:00 Folder to use the ASSETS
      constants/icons.ts 1:08:20
      1:08:46 by default TS doesnt know how to handle image imports so we need to declare a module for it in a declaration file
          => image.d.ts 1:09:00  
             type.d.ts
             1:09:29  constants/data.ts
                  1:09:40 where we ll export the tabs array that we will use to render the tab navigation and the subscription data that we will use to render the subscriptions page

# Modiy the Style of our TAB BAR 1:10:30 CLSX
       npm i clsx :allowing us to join diff classes together conditionally
       1:10:46 update the app/(tabs)/_layout.tsx
          map over the tabs
        1:15:36 use of useSafeAreaInsets from react-native-safe-area-context
        1:16:35 theme.ts
        1:20:20 Finally Implmented the floading bar navigation

        *1:20:25 safe AREA VIEW in order so that the content doesnt cut off*
                  app/(tabs)/index.tsx
                1:22:09 APlly the same pattern to all the different pages:
                  -insight.tsx
                  -settings.tsx 1:22:30
                  -subscriptions.tsx 1:22:50

 ## RECAP
      We have now 1:23:05 the home page with some navigation
      the onboarding and the 2 auth screens havent been setup properly
      We Defined our screens as files then configured them through the data array
      then import and map over them and define the styles directly within the tabs component 

# 1:24:05 PUSH TO A GITHUB BRANCH
  git checkout -b dev
  git add .
  git commit -m "feat: project setup, nativewind, routing, tab nav"
  git push -u origin dev
  CodeRabbit to the rescue 1:25:00

# 1:28:00 TYPOGRAPHY/FONTS
  - we will use expo font to load custom fonts into our app
  - we will use the Inter font family from Google Fonts
  - we will define a custom hook to load the fonts and return a boolean indicating whether the fonts have finished loading or not==>U need to explicitely load the FONTS into ur app before using them
  - app.json =>add the expo font pluggin to the plugins array 1:29:30
      1:30:50 app/_layout.tsx =>load the fonts before any screen renders as we need to keep the splash screen visible until the fonts are loaded to avoid any flash of unstyled text
##       FONTS PROCESS RECAP @1:32:45
        1st step use Fonthook @app/_layout.tsx
        2nd Step useEffect : watching the useFont Hook and acting accordingly 
        3rd step 1:33:15 sync this with Tailwind
               global.css : attach eah of the fonts to a specific classname 1:33:45
               so if u write a classNAme font-sans-bold in ur jsk => Native winfd will auto resolve it to sans bold family which points to the relative file 1:34:00 


  # Home UI implmenetation 1:36:10
    IT will have a:
      -Header
      -A Balance Card
      -Upcoming(Horizontal Scroll)
      -All Subsciptions (Vertical Scroll) with expandable details cards

  ## need for lightweigbnt day library 1:37:25
    npm i dayjs
  
  Need for an updated constants data tabs
  
  1:38:24 make sure that within. type.d.ts we export the type for the subscription data to be used across the app and to ensure type safety when working with the subscription data 1:38:24

  1:38:52 constants/images.ts: Centralize the image imports

  1:39:40 need for a currency formatting Function
      we re dealing with $ amounts 
      1:40:20 ASK Junie. ==>lib/utils.ts

  1:41:35 Implement the Home UI
    - Header with a welcome message and a profile picture
    - Balance Card showing the current balance and a button to add funds
    - Upcoming Subscriptions section with a horizontal scroll of subscription cards
    - All Subscriptions section with a vertical list of all subscriptions, each with expandable details cards to show more information about the subscription when clicked

  ## Header 1:41:40  
       app/(tabs)/index.tsx
  ## 1:48:00 Horizontal Scrolling list of upcoming subscriptions
       Reusable componets: List Heading and CARDS

  ### 1:48:45   components/ListHeading.tsx
       1:49:11 components/UpcomingSubscriptionCard.tsx

  ### 1:58:25  components/SubscriptionCard.tsx
    each card is tappable which extends the cards to show details like payment methood, catgeory , start date, renewal date and status of the subscription
    tthen tapping it collapses it 
        lib/utils.ts : helper funcs
    1:59:00 components/SubscriptionCard.tsx
      -import it to the home page
      -feed it with the subscription data to render the list of subscriptions on the home page 2:01:35
      - so that we put the pressable into action we will place it into out app/(tabs)/index.tsx and assign a state for it expandedSubscriptionId 2:06:05
      -Back to components/SubscriptionCard.tsx 2:07:35 only true if expanded

  #### 2:11:40 Turn the Subsciption card into a LIST =>rendering it within the FlastList @ app/(tabs)/index.tsx
  #### Scroll issue 2:13:50 
    nothing scrolls by default on mobile
    the flatlist handles its own content but everything above it isnt part of that scroll
    =>u hve to clean=> u hve to move all the content above the flat list into the flat list header component 
    we will take avg in the home page ( all the other views ) and we will add them as the list header component to the flat list  2:15:15
    ==> now the whole thing is actually scrollable 2:15:33
  2:15:40 additional Modifications
  2:16:35  Vertical Parent Horizental Child means no conflict

  ### 2:17:09 End of Lesson Recap
  ### 2:17:29 commit and push 