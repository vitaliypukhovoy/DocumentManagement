﻿@model String[]
@{
    
    ViewBag.Title = "Roles";
}

<h2>Roles</h2>


<ul>
    @foreach (var role in Model)
    {
        <li>@role</li>
    }
</ul>



@using (Html.BeginForm("AddRole", "Main"))
{ 
    
    
    <div>
        
        <label>Add Role</label>
        <input type="text" name="rolename" />
        <input type="submit" value="Add" />
    </div>

}
<p>
        <a href="~/SimpleMembershipAdministration/Main/Users">Users</a>
    </p>


