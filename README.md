<h1>todo</h1>
- code not nice e.g. in middleware

<h1>Project Name</h1>
....

<h2>Project Description</h2>
....

<h2>Motivation</h2> 
in post2video (next.js app router project) i have open ai key which is share by all users. currently i am working on the free tier and i want to allow each user on the free tier to have up to 6 video upload to youtube and consume no more than 20 cents (later there will be payed tier so things will be more complex) 

I all ready manage users with clerk (clerkMiddleware , privateData) and i have two roles defined

```ts
export enum Role{
    admin = 'admin',
    freeTier = 'free-tier'
}
```

- so how to do it ?

minimally i need the following :
- collect video uploads and api consumption per user
- once limit reach notify and do not allow to enter specific pages

<h2>Installation</h2>

follow <a href='#ref1'>[1]</a> for creating the project skeleton
and <a href='#ref2'>[2]</a> for creating the admin role in the clerk dashboard

<h2>Usage</h2>
....

<h2>Technologies Used</h2>
<ul>
<li>clerk</li>
<li>next.js app router</li>
<li>zod</li>
<li>typescript</li>
</ul>

<h2>Design</h2>
**** Constraints
- using clerk api in free tier is limited check <a href='https://clerk.com/docs/backend-requests/resources/rate-limits'>rate-limit</a> including currentUser  


**** Questions

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
....


<h2>Demo</h2>
.........

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
