-- File: Rental.sql

CREATE TABLE [dbo].[Rentals]
(
    [RentalId] INT PRIMARY KEY IDENTITY(1,1),
    [CustomerId] INT NOT NULL,
    [MovieId] INT NOT NULL,
    [RentalDate] DATETIME NOT NULL,
    [ReturnDate] DATETIME,
    -- Add other columns as needed

    CONSTRAINT [FK_Rentals_Customers] FOREIGN KEY ([CustomerId]) REFERENCES [dbo].[Customers]([CustomerId]),
    CONSTRAINT [FK_Rentals_Movies] FOREIGN KEY ([MovieId]) REFERENCES [dbo].[Movies]([MovieId])
);
