CREATE TABLE [dbo].[PhysicalQueues]
(
	[Id] INT NOT NULL,
	[Name] NVARCHAR(100) NOT NULL,
	[Description] NVARCHAR(MAX) NULL,
	[QueueId] INT NULL,
	[EstimatedTime] DATETIME NOT NULL CONSTRAINT [DF_EstimatedTime_PhysicalQueues] DEFAULT GETUTCDATE(),
	[CreatedTime] DATETIME NOT NULL CONSTRAINT [DF_CreatedTime_PhysicalQueues] DEFAULT GETUTCDATE(),
	CONSTRAINT [PK_PhysicalQueue] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_PhysicalQueues_Queues] FOREIGN KEY ([QueueId]) REFERENCES [dbo].[Queues]([Id]),

);
GO
CREATE NONCLUSTERED INDEX [IX_PhysicalQueues_QueueId] ON [dbo].[PhysicalQueues]([QueueId]);
GO
