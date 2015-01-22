cListApp
========

A Craigslist Search App


>##__As a person__ looking to buy an item on Craigslist, __I want__ the app to alert me as soon as</br> the item is posted __so that__ I can get the item more immediately and/or at a better value.

##Features  
###1.	login/register  

  if its a new user theyre asked to register name and password  
  * object is created to store username password 

  returning user logs in username and password and there recent info form object is loaded
  
###2.	search:  
  when keyword is entered in search field CL is checked for   results  

  if no results a message is displayed  

  if results are returned  
     * the keyword is displayed in sidebar  
     * the last 3 results img listTitle and price are displayed on page  

###3.	user searches  

  the users searches are saved in the users object  

  users most recent searches are displayed in sidebar  
  
###4.	detail view  
  when an item on page is clicked a window is displayed with items img and the rest of the items detail(location, text, etc)  

###5.	selected items #  
  a selected item can be moved(dragged) to the sidebar if user is interested  

  selected item is saved as such in users object  

###6.	updated search  
  at every X interval of time search is updated 

  if new results are found  
    * the new item/s are displayed on the page  
    * bells and whistles go off that something new was posted  
    * another layer of notification is sent to the user (email, text..maybe)  

###7.	narrow search  
  populate list of clickable other search criteria that resend the initial search with those words included  

  populate list of clickable locations to narrow search  

  have Hi/Lo price range to narrow results by  

  ...........
	
