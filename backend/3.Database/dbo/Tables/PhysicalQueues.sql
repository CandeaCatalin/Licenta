CREATE TABLE [dbo].[PhysicalQueues]
(
	[Id] INT NOT NULL IDENTITY(1,1),
	[Name] NVARCHAR(100) NOT NULL,
	[Description] NVARCHAR(MAX) NULL,
	[QueueId] INT NULL,
	[EstimatedTime] DATETIME NOT NULL CONSTRAINT [DF_EstimatedTime_PhysicalQueues] DEFAULT SYSDATETIME(),
	[CreatedTime] DATETIME NOT NULL CONSTRAINT [DF_CreatedTime_PhysicalQueues] DEFAULT SYSDATETIME(),
	CONSTRAINT [PK_PhysicalQueue] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_PhysicalQueues_Queues] FOREIGN KEY ([QueueId]) REFERENCES [dbo].[Queues]([Id]) ON DELETE CASCADE,

);
GO
CREATE NONCLUSTERED INDEX [IX_PhysicalQueues_QueueId] ON [dbo].[PhysicalQueues]([QueueId]);
GO
