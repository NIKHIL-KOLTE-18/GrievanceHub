-- Simple Database Setup for GrievanceAnalyticsDB
-- This script uses the default SQL Server LocalDB instance
-- Run this in SQL Server Management Studio or using sqlcmd

-- Create database if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'GrievanceAnalyticsDB')
BEGIN
    CREATE DATABASE GrievanceAnalyticsDB;
    PRINT 'Database GrievanceAnalyticsDB created successfully.';
END
ELSE
BEGIN
    PRINT 'Database GrievanceAnalyticsDB already exists.';
END

-- Use the database
USE GrievanceAnalyticsDB;

-- Create Grievances table if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Grievances')
BEGIN
    CREATE TABLE Grievances (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Title NVARCHAR(500) NOT NULL,
        Status NVARCHAR(50) NOT NULL DEFAULT 'Open',
        CreatedDate DATETIME2 NOT NULL DEFAULT GETDATE(),
        StudentId INT NOT NULL,
        CategoryId INT NOT NULL,
        Description NVARCHAR(MAX),
        LastUpdatedDate DATETIME2 DEFAULT GETDATE()
    );
    PRINT 'Table Grievances created successfully.';
END
ELSE
BEGIN
    PRINT 'Table Grievances already exists.';
END

-- Add Description column if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('Grievances') AND name = 'Description')
BEGIN
    ALTER TABLE Grievances ADD Description NVARCHAR(MAX);
    PRINT 'Description column added to Grievances table.';
END
ELSE
BEGIN
    PRINT 'Description column already exists in Grievances table.';
END

-- Insert sample data only if table is empty
IF NOT EXISTS (SELECT * FROM Grievances)
BEGIN
    INSERT INTO Grievances (Title, Status, CreatedDate, StudentId, CategoryId, Description)
    VALUES 
        ('Library Books Not Available', 'Open', GETDATE(), 1001, 1, 'Required textbooks are not available in the library'),
        ('Canteen Food Quality', 'Pending', DATEADD(day, -2, GETDATE()), 1002, 2, 'Food quality in canteen needs improvement'),
        ('WiFi Connectivity Issues', 'Resolved', DATEADD(day, -5, GETDATE()), 1003, 3, 'WiFi connection problems in computer lab');
    PRINT 'Sample data inserted successfully.';
END
ELSE
BEGIN
    PRINT 'Sample data already exists in Grievances table.';
END

-- Create indexes for better performance
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Grievances_Status')
BEGIN
    CREATE INDEX IX_Grievances_Status ON Grievances(Status);
    PRINT 'Index on Status column created.';
END
ELSE
BEGIN
    PRINT 'Index on Status column already exists.';
END

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Grievances_StudentId')
BEGIN
    CREATE INDEX IX_Grievances_StudentId ON Grievances(StudentId);
    PRINT 'Index on StudentId column created.';
END
ELSE
BEGIN
    PRINT 'Index on StudentId column already exists.';
END

PRINT 'Database setup completed successfully!';
