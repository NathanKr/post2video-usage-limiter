<h1>todo</h1>
- code not nice e.g. in middleware
- api rate limit (<a href='https://clerk.com/docs/backend-requests/resources/rate-limits'>docs</a>) in network tab 
<ul>
 <li>how to read it</li>
 <li>does /v1 is part of api</li>
 <li>is it active on development</li>
</ul>

<h1>Project Name</h1>
....

<h2>Project Description</h2>
i am not using open ai api here because you need api key and not everybody have it. But to feel the design i can simulate consuming credit and upload video simply by button click


<h2>Motivation</h2> 
in post2video (next.js app router project) i have open ai key which is share by all users. currently i am working on the free tier and i want to allow each user on the free tier to have up to 6 video upload to youtube and consume no more than 20 cents (later there will be payed tier so things will be more complex) 

I all ready manage users with clerk (clerkMiddleware , privateData) and i have two roles defined admin and freeTier


- so how to do it ?

minimally i need the following :
- collect video uploads and api consumption per user
- once limit reach notify and do not allow to enter specific pages

<h2>Installation</h2>

follow <a href='#ref1'>[1]</a> for creating the project skeleton
and <a href='#ref2'>[2]</a> for creating the admin role in the clerk dashboard

<h2>Usage</h2>

Run the development server

```bash
npm run dev
```

<h2>Technologies Used</h2>
<ul>
<li>clerk</li>
<li>next.js app router</li>
<li>zod</li>
<li>typescript</li>
</ul>

<h2>Design</h2>
**** Tradeoffs
in <a href='#ref2'>[2]</a> i have pointed that the layout.tsx is a server component and this help me securing easyly tabs and it has better performance because done on server.
However, every page is using it so every page must be server component. 
What happen if you need to handle user event ? extract the code to client component and use in the server component




**** Constraints
- using clerk api in free tier is limited check <a href='https://clerk.com/docs/backend-requests/resources/rate-limits'>rate-limit</a> including currentUser  


**** Questions

<h3>where to put common page navigation code</h3>
hooks

<h3>pattern for actions</h3>
- core in logic folder to be used in middleware and server component
- action in actions folder to be used in the client and provide User

<h3>where to check usage exceed limit</h3>
two options
- before navigate to page - seems better with role granularity but can be gatekeeper
- before invoke function relevant function - seem the best place

<h3>how to notify on usage exceed limit</h3>
two options
- navigate to new page "Usage Limit Exceeded"
- toast inline

once user exceed limit he can not continue in the page so best solutiuon is navigate to new page. also there you can suggest him to buy credit 

<h3>usage limiter test</h3>
usage limiter is super critical module - automatic test is required with 100% module test coverage

<h2>Code Structure</h2>

<h3>usage-limiter.ts</h3>
This file is the core of the logic 

Bwfore you try to consume credit you need to invoke
```ts
export const canConsumeCredit = async (user: User): Promise<boolean> => {
  const privateData = await getPrivateMetadata(user);

  if (!privateData) return false;

  const { creditConsumedCents } = privateData;

  const res = creditConsumedCents < MAX_CREDIT_CENTS;
  console.log(
    `canConsumeCredit . res : ${res} , creditConsumedCents : ${creditConsumedCents} , MAX_CREDIT_CENTS : ${MAX_CREDIT_CENTS}  `
  );

  return res;
};

```

if you can consume credit you call the follwoing

```ts

export const incrementCostByAmount = async (
  user: User,
  amount: number
): Promise<void> => {
  const hasCredit = await canConsumeCredit(user);

  if (!hasCredit) {
    throw new Error("credit usage exceeded");
  }

  const privateData = await getPrivateMetadata(user);

  if (!privateData) {
    throw new Error("Can not increment for empty privateData ");
  }

  privateData.creditConsumedCents += amount;

  await setPrivateMetadata(privateData);
};
```

<h3>midleware check permission</h3>

```ts

    if (
      pageNeedUsagePermission &&
      !(await hasUsagePermission(user, pageNeedUsagePermission))
    ) {
      return NextResponse.redirect(
        new URL(PageUrl.UsageLimitExceeded, req.url)
      );
    }

```

<h3>page check permission - ClientConsumeCreditButton</h3>

```tsx

  const clickHandler = async () => {
    const consumeCreditAllowed = await actionCanConsumeCredit();
    setCanConsume(consumeCreditAllowed);

    if (!consumeCreditAllowed) {
      router.push(PageUrl.UsageLimitExceeded);
      return;
    }
    await actionIncrementCostByAmount(CREDIT_AMOUNT);
    // Optionally, you might want to trigger a refresh or navigate elsewhere after incrementing
  };
```

<h2>Demo</h2>
home page for regsiterd user (non admin)

<img src='./figs/home-registred-non-admin.png'/>

check the usage after sign up

<img src='./figs/user-data-page-after-signup.png'/>


simulate consume credit by click on the button in the page UseCredit

<img src='./figs/click-on-button-to-similate-consume-credit.png'/>

navigate to user data

<img src='./figs/credit-consumes-after-one-click.png'/>

click three more times on the button , in the forth you will be directed to page Usage Limit Exceeded because of the check in the page UseCredit

<img src='./figs/navigate-to-exceed-limit.png'/>

click on the tab UseCredit and again you will be directed to this page because of the middleware check



<h2>Points of Interest</h2>
<ul>
    <li></li>
</ul>

<h2>open issues</h2>
<ul>
    <li></li>
</ul>


<h2>References</h2>
<ol>
<li id='ref1'><a href='https://youtu.be/5zE_c5kDDDs?si=qwxnm54ILEVbTYR6'> Seamless User Management with Clerk and Next.js </a></li>
<li id='ref2'><a href='https://youtu.be/JCnEFJbNyws?si=fSbTNLC0DcKwmUeo'> Mastering Role-Based Authorization with Clerk and Next.js </a></li>
</ol>
