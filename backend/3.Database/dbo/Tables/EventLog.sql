CREATE TABLE [dbo].[EventLog]
(
	[Id] INT NOT NULL,
	[Value] nvarchar(max) NULL,
	[EventCategoryId] int NOT NULL,
	[Timestamp] DATETIME NOT NULL CONSTRAINT [DF_Timestamp_EventLog] DEFAULT SYSDATETIME(),
	CONSTRAINT [PK_EventLog] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_EventLog_EventCategory] FOREIGN KEY ([EventCategoryId]) REFERENCES [dbo].[EventLog]([Id])
);
GO
CREATE NONCLUSTERED INDEX [IX_EventLog_EventCategory] ON [dbo].[EventLog]([EventCategoryId]);
Go
CREATE NONCLUSTERED INDEX [IX_EventLog_Timestamp] ON [dbo].[EventLog]([Timestamp]);
Go