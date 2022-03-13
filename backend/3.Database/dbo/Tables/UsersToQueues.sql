CREATE TABLE [dbo].[UsersToQueues]
(
	[Id] INT NOT NULL IDENTITY(1,1),
	[UserId] INT NOT NULL,
	[PhysicalQueueId] INT NOT NULL,
	[TimeAdded] DATETIME NOT NULL CONSTRAINT [DF_TimeAdded_UsersToQueues] DEFAULT SYSDATETIME(),
	[TimePassed] DATETIME NOT NULL CONSTRAINT [DF_TimePassed_UsersToQueues] DEFAULT SYSDATETIME(),
	[IsPassed] bit NULL,
	CONSTRAINT [PK_UsersToQueues] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_UsersToQueues_PhysicalQueue] FOREIGN KEY ([PhysicalQueueId]) REFERENCES [dbo].[PhysicalQueues]([Id]),
	CONSTRAINT [FK_UsersToQueues_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([Id]),
);
GO
CREATE NONCLUSTERED INDEX [IX_UsersToQueues_UserId] ON [dbo].[UsersToQueues]([UserId]);
Go
CREATE NONCLUSTERED INDEX [IX_UsersToQueues_PhysicalQueueId] ON [dbo].[UsersToQueues]([PhysicalQueueId]);
Go