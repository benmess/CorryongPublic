USE [Corryong]
GO

/****** Object:  Table [dbo].[tblQuestions]    Script Date: 4/01/2025 9:31:21 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblQuestions](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Question] [nvarchar](1000) NULL,
	[Active] [int] NULL,
	[FormTypeId] [int] NULL,
	[SectionId] [int] NULL,
	[SectionSortOrder] [int] NULL,
	[QuestionInSectionSortOrder] [int] NULL,
	[QuestionType] int NULL,
 CONSTRAINT [PK_tblQuestions] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_GetPatientFormResults]    Script Date: 4/01/2025 9:40:37 AM ******/
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
							  FormId int, FormName nvarchar(200), SectionId int, SectionSortOrder int, 
							  QuestionId int, Question nvarchar(200), QuestionInSectionSortOrder int,QuestionType int,
							  PatientResultScore float, PatientNotes nvarchar(4000))

	insert @tblOutput 
	select P.PatientID, P.FirstName, P.OtherNames, P.Surname, P.PatientId, '',
		   F.ID, F.FormName, Q.SectionId, Q.SectionSortOrder,
		   Q.ID, Question, Q.QuestionInSectionSortOrder, Q.QuestionType,
		   -1, ''
	from tblPatientDetails P, tblFormType F, tblQuestions Q
	where P.PatientId = @piPatientId
	and F.ID = @piFormId
	and F.Active = 1
	and Q.FormTypeId = F.ID
	and Q.Active = 1

	update O set PatientResultScore = PR.Score, PatientNotes = PR.Notes
	from @tblOutput O, tblPatientResults PR
	where PR.PatientId = O.PatientId
	and PR.QuestionId = O.QuestionId
	and PR.LatestIteration = 1


	select * from @tblOutput
	order by FormId, SectionId, QuestionInSectionSortOrder

END

GO

USE [Corryong]
GO

/****** Object:  Table [dbo].[tblQuestions]    Script Date: 4/01/2025 9:31:21 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblSection](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[SectionName] [nvarchar](1000) NULL,
	[SectionType] [int] NULL,
 CONSTRAINT [PK_tblSection] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


insert tblSection (SectionName, SectionType) values ('Patient Consent', 1)
insert tblSection (SectionName, SectionType) values ('Previous Health Check', 1)
insert tblSection (SectionName, SectionType) values ('Background Information', 2)

GO

USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_GetPatientFormResults]    Script Date: 4/01/2025 11:43:45 AM ******/
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
							  FormId int, FormName nvarchar(200), SectionId int, SectionSortOrder int, SectionTypeId int, 
							  QuestionId int, Question nvarchar(200), QuestionInSectionSortOrder int,QuestionType int,
							  PatientResultScore float, PatientNotes nvarchar(4000))

	insert @tblOutput 
	select P.PatientID, P.FirstName, P.OtherNames, P.Surname, P.PatientId, '',
		   F.ID, F.FormName, Q.SectionId, Q.SectionSortOrder, S.SectionType,
		   Q.ID, Question, Q.QuestionInSectionSortOrder, Q.QuestionType,
		   -1, ''
	from tblPatientDetails P, tblFormType F, tblQuestions Q, tblSection S
	where P.PatientId = @piPatientId
	and F.ID = @piFormId
	and F.Active = 1
	and Q.FormTypeId = F.ID
	and Q.Active = 1
	and Q.SectionId = S.Id

	update O set PatientResultScore = PR.Score, PatientNotes = PR.Notes
	from @tblOutput O, tblPatientResults PR
	where PR.PatientId = O.PatientId
	and PR.QuestionId = O.QuestionId
	and PR.LatestIteration = 1


	select * from @tblOutput
	order by FormId, SectionId, QuestionInSectionSortOrder

END

go


/****** Object:  Table [dbo].[tblSectionType]    Script Date: 4/01/2025 9:31:21 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblSectionType](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[SectionType] [nvarchar](1000) NULL,
 CONSTRAINT [PK_tblSectionType] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


insert tblSectionType ([SectionType]) values ('2 columns, question and yes/no')
insert tblSectionType ([SectionType]) values ('2 columns, question and comments')

GO


/****** Object:  Table [dbo].[tblQuestionType]    Script Date: 4/01/2025 9:31:21 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblQuestionType](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[QuestionType] [nvarchar](1000) NULL,
 CONSTRAINT [PK_tblQuestionType] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


insert tblQuestionType ([QuestionType]) values ('Header with no borders. Typically a section header')
insert tblQuestionType ([QuestionType]) values ('Header with borders. Typically the top of a section table')
insert tblQuestionType ([QuestionType]) values ('Question with a yes/no score. A 2 column question')
insert tblQuestionType ([QuestionType]) values ('A text area with a label, spanning all columns of the table')
insert tblQuestionType ([QuestionType]) values ('Question with a comment. A 2 column question')
insert tblQuestionType ([QuestionType]) values ('Header for question with parts, spanning all columns of table.')
insert tblQuestionType ([QuestionType]) values ('A text area with a label, spanning all columns of the table but left and right borders only')

GO
