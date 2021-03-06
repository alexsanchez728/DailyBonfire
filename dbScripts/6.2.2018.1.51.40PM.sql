USE [master]
GO
/****** Object:  Database [Bonfire]    Script Date: 6/2/2018 1:52:16 PM ******/
CREATE DATABASE [Bonfire]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Bonfire', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\Bonfire.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Bonfire_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\Bonfire_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [Bonfire] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Bonfire].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Bonfire] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Bonfire] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Bonfire] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Bonfire] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Bonfire] SET ARITHABORT OFF 
GO
ALTER DATABASE [Bonfire] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Bonfire] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Bonfire] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Bonfire] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Bonfire] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Bonfire] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Bonfire] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Bonfire] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Bonfire] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Bonfire] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Bonfire] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Bonfire] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Bonfire] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Bonfire] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Bonfire] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Bonfire] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Bonfire] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Bonfire] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Bonfire] SET  MULTI_USER 
GO
ALTER DATABASE [Bonfire] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Bonfire] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Bonfire] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Bonfire] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Bonfire] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Bonfire] SET QUERY_STORE = OFF
GO
USE [Bonfire]
GO
ALTER DATABASE SCOPED CONFIGURATION SET IDENTITY_CACHE = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [Bonfire]
GO
/****** Object:  Table [dbo].[Boards]    Script Date: 6/2/2018 1:52:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Boards](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](50) NULL,
	[DescriptionFromUser] [nvarchar](500) NULL,
 CONSTRAINT [PK_Boards] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Content]    Script Date: 6/2/2018 1:52:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Content](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](50) NULL,
	[WebsiteDescription] [nvarchar](500) NULL,
	[url] [nvarchar](500) NULL,
 CONSTRAINT [PK_Content] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 6/2/2018 1:52:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Bio] [nvarchar](500) NULL,
	[JoinDate] [datetime] NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserBoard]    Script Date: 6/2/2018 1:52:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserBoard](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[BoardId] [int] NOT NULL,
	[IsPublic] [bit] NOT NULL,
	[Keywords] [nvarchar](500) NULL,
 CONSTRAINT [PK_UserBoard] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserContent]    Script Date: 6/2/2018 1:52:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserContent](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[ContentId] [int] NOT NULL,
	[UserDescription] [nvarchar](500) NULL,
	[Keywords] [nvarchar](500) NULL,
	[IsPublic] [bit] NOT NULL,
	[UserBoardId] [int] NULL,
 CONSTRAINT [PK_UserContent] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[User] ADD  CONSTRAINT [Default_join]  DEFAULT (getdate()) FOR [JoinDate]
GO
ALTER TABLE [dbo].[UserBoard]  WITH CHECK ADD  CONSTRAINT [FK_Board] FOREIGN KEY([BoardId])
REFERENCES [dbo].[Boards] ([Id])
GO
ALTER TABLE [dbo].[UserBoard] CHECK CONSTRAINT [FK_Board]
GO
ALTER TABLE [dbo].[UserBoard]  WITH CHECK ADD  CONSTRAINT [FK_BoardCreator] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[UserBoard] CHECK CONSTRAINT [FK_BoardCreator]
GO
ALTER TABLE [dbo].[UserContent]  WITH CHECK ADD  CONSTRAINT [FK_Content] FOREIGN KEY([ContentId])
REFERENCES [dbo].[Content] ([Id])
GO
ALTER TABLE [dbo].[UserContent] CHECK CONSTRAINT [FK_Content]
GO
ALTER TABLE [dbo].[UserContent]  WITH CHECK ADD  CONSTRAINT [FK_ContentCreator] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[UserContent] CHECK CONSTRAINT [FK_ContentCreator]
GO
ALTER TABLE [dbo].[UserContent]  WITH CHECK ADD  CONSTRAINT [FK_UserBoard] FOREIGN KEY([UserBoardId])
REFERENCES [dbo].[UserBoard] ([Id])
GO
ALTER TABLE [dbo].[UserContent] CHECK CONSTRAINT [FK_UserBoard]
GO
USE [master]
GO
ALTER DATABASE [Bonfire] SET  READ_WRITE 
GO
