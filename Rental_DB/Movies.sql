-- File: Movie.sql

CREATE TABLE [dbo].[Movies]
(
    [MovieId] INT PRIMARY KEY IDENTITY(1,1),
    [Title] NVARCHAR(100) NOT NULL,
    [Director] NVARCHAR(100),
    [Year] INT
    -- Add other columns as needed
);
