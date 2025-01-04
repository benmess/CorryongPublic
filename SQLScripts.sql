USE Corryong
GO

/****** Object:  Table [dbo].[tblBeds]    Script Date: 1/06/2024 10:56:04 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblBeds](
	[BedNo] [int] NOT NULL,
	[FirstName] [nvarchar](60) NULL,
	[MiddleName] [nvarchar](60) NULL,
	[LastName] [nvarchar](60) NULL,
 CONSTRAINT [PK_tblBeds] PRIMARY KEY CLUSTERED 
(
	[BedNo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


insert tblBeds (BedNo, FirstName, LastName) values (1, 'John', 'Citizen')
insert tblBeds (BedNo, FirstName, LastName) values (2, 'Jane', 'Citizen')
insert tblBeds (BedNo, FirstName, LastName) values (3, 'Frank', 'Smith')
insert tblBeds (BedNo, FirstName, LastName) values (4, 'Fiona', 'Jones')
insert tblBeds (BedNo, FirstName, LastName) values (5, 'Samantha', 'Green')
insert tblBeds (BedNo, FirstName, LastName) values (6, 'Mabel', 'Brown')
insert tblBeds (BedNo, FirstName, LastName) values (7, 'Gloria', 'D''Rosario')

GO

USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_GetBeds]    Script Date: 1/06/2024 11:04:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[SP_GetBeds] 

as

begin
	select * from tblBeds
	order by 1
END

GO

/*************************/
/*    Deployed 15/5/24   */
/*************************/


USE [Corryong]
GO

/****** Object:  Table [dbo].[tblPatient]    Script Date: 19/06/2024 10:11:11 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblPatient](
	[ID] [int] IDENTITY (1,1) NOT NULL,
	[FirstName] [nvarchar](60) NULL,
	[MiddleName] [nvarchar](60) NULL,
	[LastName] [nvarchar](60) NULL,
	[CorryongId] bigint NULL,
	[MedicareNo] nvarchar(60) NULL
 CONSTRAINT [PK_tblPatient] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

USE [Corryong]
GO

/****** Object:  Table [dbo].[tblPatientDetails]    Script Date: 18/08/2024 10:45:17 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblPatientDetails](
	[PatientId] [int] NULL,
	[ChartNo] [nvarchar](255) NULL,
	[Patient] [nvarchar](255) NULL,
	[NoOfSpaces] [float] NULL,
	[ExtraNames] [nvarchar](255) NULL,
	[FirstSpace] [int] NULL,
	[SecondSpace] [int] NULL,
	[ThirdSpace] [int] NULL,
	[Salutation] [nvarchar](255) NULL,
	[FirstName] [nvarchar](255) NULL,
	[OtherNames] [nvarchar](255) NULL,
	[Surname] [nvarchar](255) NULL,
	[DOB] [datetime] NULL,
	[Age] [int] NULL,
	[Gender] [nvarchar](255) NULL,
	[Address1] [nvarchar](255) NULL,
	[AddressOnly] [nvarchar](255) NULL,
	[Email] [nvarchar](255) NULL,
	[HomePhone] [nvarchar](255) NULL,
	[WorkPhone] [nvarchar](255) NULL,
	[ConcessionType] [nvarchar](255) NULL
) ON [PRIMARY]
GO



USE [Corryong]
GO

/****** Object:  Table [dbo].[tblFormType]    Script Date: 19/06/2024 10:11:11 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblFormType](
	[ID] [int] IDENTITY (1,1) NOT NULL,
	[FormName] [nvarchar](200) NULL,
	[Active] int NULL,
 CONSTRAINT [PK_tblFormType] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


/****** Object:  Table [dbo].[tblQuestions]    Script Date: 19/06/2024 10:11:11 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblQuestions](
	[ID] [int] IDENTITY (1,1) NOT NULL,
	[Question] [nvarchar](1000) NULL,
	[Active] int NULL,
	[FormTypeId] int NULL,
	[FormSortOrder] int NULL
 CONSTRAINT [PK_tblQuestions] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


USE [Corryong]
GO

/****** Object:  Table [dbo].[tblReportType]    Script Date: 19/06/2024 10:11:11 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblReportType](
	[ID] [int] IDENTITY (1,1) NOT NULL,
	[ReportName] [nvarchar](200) NULL,
	[Active] int NULL,
 CONSTRAINT [PK_tblReportType] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

USE [Corryong]
GO

/****** Object:  Table [dbo].[tblReport]    Script Date: 19/06/2024 10:11:11 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblReport](
	[ID] [int] IDENTITY (1,1) NOT NULL,
	[QuestionId] int NULL,
	[ReportTypeTypeId] int NULL,
	[ReportSortOrder] int NULL
 CONSTRAINT [PK_tblReport] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


USE [Corryong]
GO

/****** Object:  Table [dbo].[tblPatientResults]    Script Date: 19/06/2024 10:11:11 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblPatientResults](
	[ID] [int] IDENTITY (1,1) NOT NULL,
	[PatientId] int NULL,
	[FormTypeId] int NULL,
	[QuestionId] int NULL,
	[Score] float NULL,
	[Notes] nvarchar(4000) NULL,
	[DateSaved] datetime NULL,
	[UserSaved] nvarchar(100) NULL,
	[LatestIteration] int NULL
 CONSTRAINT [PK_tblPatientResults] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


--insert tblPatient ([FirstName], [MiddleName], [LastName], [CorryongId], [MedicareNo]) values ('Jane', 'Anne', 'Citizen', 1234, 'ABC Medi 1')

--insert tblFormType (FormName, Active) values ('4M Form', 1)

--insert tblQuestions (Question, Active, FormTypeId, FormSortOrder) values ('How are you feeling today?', 1, 1, 1)
--insert tblQuestions (Question, Active, FormTypeId, FormSortOrder) values ('On a scale of 1 to 10 how would you rate your wellbeing?', 1, 1, 2)
--insert tblQuestions (Question, Active, FormTypeId, FormSortOrder) values ('This is the 3rd question', 1, 1, 3)
--insert tblQuestions (Question, Active, FormTypeId, FormSortOrder) values ('This is the 4th question', 1, 1, 4)
--insert tblQuestions (Question, Active, FormTypeId, FormSortOrder) values ('This is the 5th question', 1, 1, 5)
--insert tblQuestions (Question, Active, FormTypeId, FormSortOrder) values ('This is the 6th question', 1, 1, 6)

insert tblQuestions (Question, Active, FormTypeId, FormSortOrder) values ('This is the 7th question', 1, 1, 7)
update tblQuestions set Active = 1 where ID = 5
update tblQuestions set Active = 0 where ID = 7

select * from tblQuestions

GO



USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_GetPatientFormResults]    Script Date: 19/06/2024 12:18:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[SP_GetPatientFormResults] 

	@piFormId int,
	@piPatientId int
as

begin

	SET NOCOUNT ON

	declare @tblOutput table (PatientId int, FirstName nvarchar(60), MiddleName nvarchar(60), LastName nvarchar(60), CorryongId int, MedicareNo nvarchar(40), 
							  FormId int, FormName nvarchar(200),
							  QuestionId int, Question nvarchar(200), FormSortOrder int,
							  PatientResultScore float, PatientNotes nvarchar(4000))

	insert @tblOutput 
	select P.ID, P.FirstName, P.MiddleName, P.LastName, P.CorryongId, P.MedicareNo,
		   F.ID, F.FormName,
		   Q.ID, Question, Q.FormSortOrder,
		   -1, ''
	from tblPatient P, tblFormType F, tblQuestions Q
	where P.ID = @piPatientId
	and F.ID = @piFormId
	and F.Active = 1
	and Q.FormTypeId = F.ID
	and Q.Active = 1
	order by Q.FormSortOrder

	update O set PatientResultScore = PR.Score, PatientNotes = PR.Notes
	from @tblOutput O, tblPatientResults PR
	where PR.PatientId = O.PatientId
	and PR.QuestionId = O.QuestionId
	and PR.LatestIteration = 1


	select * from @tblOutput
END

GO


USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_GetPatientFormResults]    Script Date: 18/08/2024 10:47:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



ALTER proc [dbo].[SP_GetPatientFormResults] 

	@piFormId int,
	@piPatientId int
as

begin

	SET NOCOUNT ON

	declare @tblOutput table (PatientId int, FirstName nvarchar(60), MiddleName nvarchar(60), LastName nvarchar(60), CorryongId int, MedicareNo nvarchar(40), 
							  FormId int, FormName nvarchar(200),
							  QuestionId int, Question nvarchar(200), FormSortOrder int,
							  PatientResultScore float, PatientNotes nvarchar(4000))

	insert @tblOutput 
	select P.PatientID, P.FirstName, P.OtherNames, P.Surname, P.PatientId, '',
		   F.ID, F.FormName,
		   Q.ID, Question, Q.FormSortOrder,
		   -1, ''
	from tblPatientDetails P, tblFormType F, tblQuestions Q
	where P.PatientId = @piPatientId
	and F.ID = @piFormId
	and F.Active = 1
	and Q.FormTypeId = F.ID
	and Q.Active = 1
	order by Q.FormSortOrder

	update O set PatientResultScore = PR.Score, PatientNotes = PR.Notes
	from @tblOutput O, tblPatientResults PR
	where PR.PatientId = O.PatientId
	and PR.QuestionId = O.QuestionId
	and PR.LatestIteration = 1


	select * from @tblOutput
	order by FormSortOrder

END

GO
