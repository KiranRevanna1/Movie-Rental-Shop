-- File: Customer.sql

CREATE TABLE [dbo].[Customers]
(
    [CustomerId] INT PRIMARY KEY IDENTITY(1,1),
    [Name] NVARCHAR(100) NOT NULL,
    [Email] NVARCHAR(100)
    -- Add other columns as needed
);
