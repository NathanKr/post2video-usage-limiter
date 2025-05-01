<h1>Project Name</h1>
....



<h2>Project Description</h2>
....

<h2>Motivation</h2>
in post2video i have open ai key which is share by all users. currently i am working on the free tier and i want to allow each user on the free tier to have up to 6 video upload to youtube and consume no more than 20 cents (later there will be payed tier so things will be more complex) - so how to do it ? 

minimally you need the following :
- collect video uploads and api consumption per user
- once limit reach notify and do not allow to enter specific pages

<h2>Installation</h2>
....


<h2>Usage</h2>
....


<h2>Technologies Used</h2>
....


<h2>Design</h2>
questions
<ol>
<li>can i come with generic design</li>
<li>does design involve ui </li>
<li>does it involve the user management (check <a href='https://github.com/NathanKr/post2video-user-management'>post2video-user-management</a>) i.e. clerk</li>
<li>if clerk is part of the design ---> can i use role for better design</li>

</ol>

gemini answers :
In summary:
<ol>
    <li>Start with a generic design for the core logic of tracking, enforcing, notifying, and blocking</li>
    <li>The initial design doesn't need to include UI details, but you should consider how the UI will eventually interact with the backend</li>
    <li>Your design must integrate with your user management system (Clerk) to associate usage with specific users</li>
    <li>Leveraging roles in Clerk is a highly recommended approach for a cleaner, more scalable design, especially when considering future paid tiers and potentially different limits</li>
</ol>


More questions

<h3>choose roles</h3>
Q : user can be in one of these state : admin , not registred ,registred (free tier,free tier expired , payed program , payed program expired) does every state is a role

A : Yes, I've identified three primary roles based on the fundamental levels of access and responsibilities:

    Admin: Full control and management capabilities.
    Free Tier: Basic access and permissions granted to registered users without a paid subscription.
    Paid Tier: Enhanced access and permissions associated with users who have a paid subscription.

Then, for the states like "free tier expired" and "paid program expired," we'd use user metadata within Clerk to track those temporary statuses. Your application logic would then consider both the user's role and their metadata to determine their current level of access and the features available to them.

Not registerd will give null user so no need for user because here user must be registered

<h2>Code Structure</h2>
....

<h2>Demo</h2>
....

<h2>Points of Interest</h2>
<ul>
    <li>...</li>
   
</ul>

<h2>References</h2>
<ul>
    <li>...</li>
   
</ul>

