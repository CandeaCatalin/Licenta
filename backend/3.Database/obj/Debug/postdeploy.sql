/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/

/*
	INSERT ROLES FOR USERS
*/
IF NOT EXISTS(SELECT * FROM [dbo].[UserRoles] WHERE [Name] = 'Admin' AND [Id] = 1) 
	BEGIN 
		INSERT INTO [dbo].[UserRoles]([Id],[Name]) VALUES (1,'Admin') 
	END
	
IF NOT EXISTS(SELECT * FROM [dbo].[UserRoles] WHERE [Name] = 'User' AND [Id] = 2) 
	BEGIN 
		INSERT INTO [dbo].[UserRoles]([Id],[Name]) VALUES (2,'User') 
	END

/*
	INSERT CATEGORIES FOR EVENTS
*/

IF NOT EXISTS(SELECT * FROM [dbo].[EventCategory] WHERE [Name] = 'Success' AND [Id] = 1) 
	BEGIN 
		INSERT INTO [dbo].[EventCategory]([Id],[Name]) VALUES (1,'Success') 
	END
IF NOT EXISTS(SELECT * FROM [dbo].[EventCategory] WHERE [Name] = 'Error' AND [Id] = 2) 
	BEGIN 
		INSERT INTO [dbo].[EventCategory]([Id],[Name]) VALUES (2,'Error') 
	END
GO
