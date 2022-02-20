CREATE TABLE [dbo].[Users]
(
	[Id] INT NOT NULL,
	[FirstName] NVARCHAR(100) NOT NULL,
	[LastName] NVARCHAR(100) NOT NULL,
	[Email] NVARCHAR(250) NOT NULL,
	[Password] NVARCHAR(max) NOT NULL,
	[IsActive] bit NOT NULL,
	[UserRoleId] INT NOT NULL,
	[CreatedTime] DATETIME NOT NULL CONSTRAINT [DF_CreatedTime_User] DEFAULT GETUTCDATE(),
	[QueueId] INT NULL,
	[UsersToQueuesId] INT NULL,
	[PhysicalQueueId] INT NULL,
	CONSTRAINT [PK_Users] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_Users_UserRole] FOREIGN KEY ([UserRoleId]) REFERENCES [dbo].[UserRole]([Id]),
	CONSTRAINT [FK_Users_Queues] FOREIGN KEY ([QueueId]) REFERENCES [dbo].[Queues]([Id]),
	CONSTRAINT [FK_Users_PhysicalQueues] FOREIGN KEY ([PhysicalQueueId]) REFERENCES [dbo].[PhysicalQueues]([Id]),
	CONSTRAINT [FK_Users_UsersToQueuesId] FOREIGN KEY ([UsersToQueuesId]) REFERENCES [dbo].[UsersToQueues]([Id]),
	
	CONSTRAINT [UC_Users_Email] UNIQUE ([Email]),
);
GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_Users_Email] ON [dbo].[Users]([Email]);
GO
CREATE NONCLUSTERED INDEX [IX_Users_QueueId] ON [dbo].[Users]([QueueId]);
GO
CREATE NONCLUSTERED INDEX [IX_Users_UserRoleId] ON [dbo].[Users]([UserRoleId]);
GO
CREATE NONCLUSTERED INDEX [IX_Users_PhysicalQueueId] ON [dbo].[Users]([PhysicalQueueId]);
GO