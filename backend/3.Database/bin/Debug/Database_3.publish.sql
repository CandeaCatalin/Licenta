﻿/*
Deployment script for QueueManagementTesting

This code was generated by a tool.
Changes to this file may cause incorrect behavior and will be lost if
the code is regenerated.
*/

GO
SET ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT, CONCAT_NULL_YIELDS_NULL, QUOTED_IDENTIFIER ON;

SET NUMERIC_ROUNDABORT OFF;


GO
:setvar DatabaseName "QueueManagementTesting"
:setvar DefaultFilePrefix "QueueManagementTesting"
:setvar DefaultDataPath "C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\"
:setvar DefaultLogPath "C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\"

GO
:on error exit
GO
/*
Detect SQLCMD mode and disable script execution if SQLCMD mode is not supported.
To re-enable the script after enabling SQLCMD mode, execute the following:
SET NOEXEC OFF; 
*/
:setvar __IsSqlCmdEnabled "True"
GO
IF N'$(__IsSqlCmdEnabled)' NOT LIKE N'True'
    BEGIN
        PRINT N'SQLCMD mode must be enabled to successfully execute this script.';
        SET NOEXEC ON;
    END


GO
USE [$(DatabaseName)];


GO
PRINT N'Dropping Default Constraint [dbo].[DF_CreatedTime_User]...';


GO
ALTER TABLE [dbo].[Users] DROP CONSTRAINT [DF_CreatedTime_User];


GO
PRINT N'Dropping Default Constraint [dbo].[DF_QueueId_User]...';


GO
ALTER TABLE [dbo].[Users] DROP CONSTRAINT [DF_QueueId_User];


GO
PRINT N'Dropping Default Constraint [dbo].[DF_PhysicalQueueId_User]...';


GO
ALTER TABLE [dbo].[Users] DROP CONSTRAINT [DF_PhysicalQueueId_User];


GO
PRINT N'Dropping Foreign Key [dbo].[FK_Users_UserRole]...';


GO
ALTER TABLE [dbo].[Users] DROP CONSTRAINT [FK_Users_UserRole];


GO
PRINT N'Dropping Foreign Key [dbo].[FK_Users_Queues]...';


GO
ALTER TABLE [dbo].[Users] DROP CONSTRAINT [FK_Users_Queues];


GO
PRINT N'Dropping Foreign Key [dbo].[FK_Users_PhysicalQueues]...';


GO
ALTER TABLE [dbo].[Users] DROP CONSTRAINT [FK_Users_PhysicalQueues];


GO
PRINT N'Dropping Foreign Key [dbo].[FK_UsersToQueues_User]...';


GO
ALTER TABLE [dbo].[UsersToQueues] DROP CONSTRAINT [FK_UsersToQueues_User];


GO
PRINT N'Starting rebuilding table [dbo].[Users]...';


GO
BEGIN TRANSACTION;

SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

SET XACT_ABORT ON;

CREATE TABLE [dbo].[tmp_ms_xx_Users] (
    [Id]              INT            NOT NULL,
    [FirstName]       NVARCHAR (100) NOT NULL,
    [LastName]        NVARCHAR (100) NOT NULL,
    [Email]           NVARCHAR (250) NOT NULL,
    [Password]        NVARCHAR (50)  NOT NULL,
    [IsActive]        BIT            NOT NULL,
    [UserRoleId]      INT            NOT NULL,
    [CreatedTime]     DATETIME       CONSTRAINT [DF_CreatedTime_User] DEFAULT GETUTCDATE() NOT NULL,
    [QueueId]         INT            CONSTRAINT [DF_QueueId_User] DEFAULT (0) NOT NULL,
    [UsersToQueuesId] INT            CONSTRAINT [DF_UsersToQueues_User] DEFAULT (0) NOT NULL,
    [PhysicalQueueId] INT            CONSTRAINT [DF_PhysicalQueueId_User] DEFAULT (0) NOT NULL,
    CONSTRAINT [tmp_ms_xx_constraint_PK_Users1] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [tmp_ms_xx_constraint_UC_Users_Email1] UNIQUE NONCLUSTERED ([Email] ASC)
);

IF EXISTS (SELECT TOP 1 1 
           FROM   [dbo].[Users])
    BEGIN
        INSERT INTO [dbo].[tmp_ms_xx_Users] ([Id], [FirstName], [LastName], [Email], [Password], [IsActive], [UserRoleId], [CreatedTime], [QueueId], [PhysicalQueueId])
        SELECT   [Id],
                 [FirstName],
                 [LastName],
                 [Email],
                 [Password],
                 [IsActive],
                 [UserRoleId],
                 [CreatedTime],
                 [QueueId],
                 [PhysicalQueueId]
        FROM     [dbo].[Users]
        ORDER BY [Id] ASC;
    END

DROP TABLE [dbo].[Users];

EXECUTE sp_rename N'[dbo].[tmp_ms_xx_Users]', N'Users';

EXECUTE sp_rename N'[dbo].[tmp_ms_xx_constraint_PK_Users1]', N'PK_Users', N'OBJECT';

EXECUTE sp_rename N'[dbo].[tmp_ms_xx_constraint_UC_Users_Email1]', N'UC_Users_Email', N'OBJECT';

COMMIT TRANSACTION;

SET TRANSACTION ISOLATION LEVEL READ COMMITTED;


GO
PRINT N'Creating Index [dbo].[Users].[IX_Users_Email]...';


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_Users_Email]
    ON [dbo].[Users]([Email] ASC);


GO
PRINT N'Creating Index [dbo].[Users].[IX_Users_QueueId]...';


GO
CREATE NONCLUSTERED INDEX [IX_Users_QueueId]
    ON [dbo].[Users]([QueueId] ASC);


GO
PRINT N'Creating Index [dbo].[Users].[IX_Users_UserRoleId]...';


GO
CREATE NONCLUSTERED INDEX [IX_Users_UserRoleId]
    ON [dbo].[Users]([UserRoleId] ASC);


GO
PRINT N'Creating Index [dbo].[Users].[IX_Users_PhysicalQueueId]...';


GO
CREATE NONCLUSTERED INDEX [IX_Users_PhysicalQueueId]
    ON [dbo].[Users]([PhysicalQueueId] ASC);


GO
PRINT N'Creating Foreign Key [dbo].[FK_Users_UserRole]...';


GO
ALTER TABLE [dbo].[Users] WITH NOCHECK
    ADD CONSTRAINT [FK_Users_UserRole] FOREIGN KEY ([UserRoleId]) REFERENCES [dbo].[UserRole] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[FK_Users_Queues]...';


GO
ALTER TABLE [dbo].[Users] WITH NOCHECK
    ADD CONSTRAINT [FK_Users_Queues] FOREIGN KEY ([QueueId]) REFERENCES [dbo].[Queues] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[FK_Users_PhysicalQueues]...';


GO
ALTER TABLE [dbo].[Users] WITH NOCHECK
    ADD CONSTRAINT [FK_Users_PhysicalQueues] FOREIGN KEY ([PhysicalQueueId]) REFERENCES [dbo].[PhysicalQueues] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[FK_UsersToQueues_User]...';


GO
ALTER TABLE [dbo].[UsersToQueues] WITH NOCHECK
    ADD CONSTRAINT [FK_UsersToQueues_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([Id]);


GO
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
IF NOT EXISTS(SELECT * FROM [dbo].[UserRole] WHERE [Name] = 'Admin' AND [Id] = 1) 
	BEGIN 
		INSERT INTO [dbo].[UserRole]([Id],[Name]) VALUES (1,'Admin') 
	END
	
IF NOT EXISTS(SELECT * FROM [dbo].[UserRole] WHERE [Name] = 'User' AND [Id] = 2) 
	BEGIN 
		INSERT INTO [dbo].[UserRole]([Id],[Name]) VALUES (2,'User') 
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

GO
PRINT N'Checking existing data against newly created constraints';


GO
USE [$(DatabaseName)];


GO
ALTER TABLE [dbo].[Users] WITH CHECK CHECK CONSTRAINT [FK_Users_UserRole];

ALTER TABLE [dbo].[Users] WITH CHECK CHECK CONSTRAINT [FK_Users_Queues];

ALTER TABLE [dbo].[Users] WITH CHECK CHECK CONSTRAINT [FK_Users_PhysicalQueues];

ALTER TABLE [dbo].[UsersToQueues] WITH CHECK CHECK CONSTRAINT [FK_UsersToQueues_User];


GO
PRINT N'Update complete.';


GO
