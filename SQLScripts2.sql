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


USE [Corryong]
GO

/****** Object:  Table [dbo].[tblReport]    Script Date: 5/01/2025 4:16:30 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblReport](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[PatientId] [int] NULL,
	[FormId] [int] NULL,
	[FormDate] datetime NULL,
 CONSTRAINT [PK_tblReport] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_GetPatientFormResults]    Script Date: 5/01/2025 4:21:29 PM ******/
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

	declare @tblOutput table (ReportId int, PatientId int, FirstName nvarchar(60), MiddleName nvarchar(60), LastName nvarchar(60), CorryongId int, MedicareNo nvarchar(40), 
							  FormId int, FormName nvarchar(200), SectionId int, SectionSortOrder int, SectionTypeId int, 
							  QuestionId int, Question nvarchar(200), QuestionInSectionSortOrder int,QuestionType int,
							  PatientResultScore float, PatientNotes nvarchar(4000))
	declare @iReportId int

	set @iReportId = -1

	select @iReportId = ID from tblReport where PatientId = @piPatientId and FormId = @piFormId and FormDate = GetDate()

	insert @tblOutput 
	select @iReportId, P.PatientID, P.FirstName, P.OtherNames, P.Surname, P.PatientId, '',
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

GO

USE [Corryong]
GO

/****** Object:  Table [dbo].[tblPatientResults]    Script Date: 5/01/2025 5:14:30 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblPatientResults](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[PatientId] [int] NULL,
	[FormId] [int] NULL,
	[ReportId] [int] NULL,
	[QuestionId] [int] NULL,
	[Score] [float] NULL,
	[Scale] [float] NULL,
	[Notes] [nvarchar](4000) NULL,
	[DataPoint1] [nvarchar] (1000) NULL,
	[DataPoint2] [nvarchar] (1000) NULL,
	[DataPoint3] [nvarchar] (1000) NULL,
	[DataPoint4] [nvarchar] (1000) NULL,
	[DataPoint5] [nvarchar] (1000) NULL,
	[DateSaved] [datetime] NULL,
	[UserSaved] [nvarchar](100) NULL,
	[LatestIteration] [int] NULL,
 CONSTRAINT [PK_tblPatientResults] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_SetPatientFormResults]    Script Date: 5/01/2025 4:21:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[SP_SetPatientFormResults] 

	@piFormId int,
	@piPatientId int,
	@piQuestionId int,
	@pdtFormDate datetime,
	@pfScore float,
	@pfScale float,
	@pvchNotes nvarchar(1000),
	@pvchDataPoint1 nvarchar(1000),
	@pvchDataPoint2 nvarchar(1000),
	@pvchDataPoint3 nvarchar(1000),
	@pvchDataPoint4 nvarchar(1000),
	@pvchDataPoint5 nvarchar(1000),
	@pvchUser nvarchar(100)
as

begin

	SET NOCOUNT ON

	declare @iReportId int

	set @iReportId = -1

	select @iReportId = ID from tblReport where PatientId = @piPatientId and FormId = @piFormId and FormDate = @pdtFormDate

	update tblPatientResults set LatestIteration = 0 where PatientId = @piPatientId and QuestionId = @piQuestionId

	if(@iReportId = -1)
	begin
		insert tblPatientResults (PatientId, FormId, ReportId, QuestionId, Score, Scale, Notes, 
				DataPoint1, DataPoint2, DataPoint3, DataPoint4, DataPoint5, DateSaved, UserSaved, LatestIteration)
				values (@piPatientId, @piFormId, @iReportId, @piQuestionId, @pfScore, @pfScale, @pvchNotes,
				@pvchDataPoint1, @pvchDataPoint2, @pvchDataPoint3, @pvchDataPoint4, @pvchDataPoint5, GetDate(), @pvchUser, 1)
	end
	else
	begin 
		update tblPatientResults set
		FormId = @piFormId, 
		Score = @pfScore, 
		Scale = @PfScale, 
		Notes = @pvchNotes, 
		DataPoint1 = @pvchDataPoint1, 
		DataPoint2 = @pvchDataPoint2, 
		DataPoint3 = @pvchDataPoint3, 
		DataPoint4 = @pvchDataPoint4, 
		DataPoint5 = @pvchDataPoint5, 
		DateSaved = GetDate(), 
		UserSaved = @pvchUser, 
		LatestIteration = 1
		where ReportId = @iReportId
		and PatientId = @piPatientId
		and QuestionId = @piQuestionId
	end

	select @iReportId as ReportId

END

GO

USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_SetPatientFormResults]    Script Date: 5/01/2025 4:21:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



ALTER proc [dbo].[SP_SetPatientFormResults] 

	@piFormId int,
	@piPatientId int,
	@piQuestionId int,
	@pdtFormDate datetime,
	@pfScore float,
	@pfScale float,
	@pvchNotes nvarchar(1000),
	@pvchDataPoint1 nvarchar(1000),
	@pvchDataPoint2 nvarchar(1000),
	@pvchDataPoint3 nvarchar(1000),
	@pvchDataPoint4 nvarchar(1000),
	@pvchDataPoint5 nvarchar(1000),
	@pvchUser nvarchar(100)
as

begin

	SET NOCOUNT ON

	declare @iReportId int

	set @iReportId = -1

	select @iReportId = ID from tblReport where PatientId = @piPatientId and FormId = @piFormId and FormDate = @pdtFormDate

	update tblPatientResults set LatestIteration = 0 where PatientId = @piPatientId and QuestionId = @piQuestionId

	if(@iReportId = -1)
	begin
		insert tblPatientResults (PatientId, FormId, ReportId, QuestionId, Score, Scale, Notes, 
				DataPoint1, DataPoint2, DataPoint3, DataPoint4, DataPoint5, DateSaved, UserSaved, LatestIteration)
				values (@piPatientId, @piFormId, @iReportId, @piQuestionId, @pfScore, @pfScale, @pvchNotes,
				@pvchDataPoint1, @pvchDataPoint2, @pvchDataPoint3, @pvchDataPoint4, @pvchDataPoint5, GetDate(), @pvchUser, 1)
		SELECT @iReportId = SCOPE_IDENTITY()
	end
	else
	begin 
		update tblPatientResults set
		FormId = @piFormId, 
		Score = @pfScore, 
		Scale = @PfScale, 
		Notes = @pvchNotes, 
		DataPoint1 = @pvchDataPoint1, 
		DataPoint2 = @pvchDataPoint2, 
		DataPoint3 = @pvchDataPoint3, 
		DataPoint4 = @pvchDataPoint4, 
		DataPoint5 = @pvchDataPoint5, 
		DateSaved = GetDate(), 
		UserSaved = @pvchUser, 
		LatestIteration = 1
		where ReportId = @iReportId
		and PatientId = @piPatientId
		and QuestionId = @piQuestionId
	end

	select @iReportId as ReportId

END

GO

USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_GetPatientFormResults]    Script Date: 6/01/2025 9:28:11 PM ******/
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

	declare @tblOutput table (ReportId int, PatientId int, FirstName nvarchar(60), MiddleName nvarchar(60), LastName nvarchar(60), CorryongId int, MedicareNo nvarchar(40), 
							  FormId int, FormName nvarchar(200), SectionId int, SectionSortOrder int, SectionTypeId int, 
							  QuestionId int, Question nvarchar(200), QuestionInSectionSortOrder int,QuestionType int,
							  PatientResultScore float,  PatientResultScale float, PatientNotes nvarchar(4000), 
							  Datapoint1 nvarchar(1000), Datapoint2 nvarchar(1000), Datapoint3 nvarchar(1000), Datapoint4 nvarchar(1000), Datapoint5 nvarchar(1000))
	declare @iReportId int

	set @iReportId = -1

	select @iReportId = ID from tblReport where PatientId = @piPatientId and FormId = @piFormId and FormDate = GetDate()

	insert @tblOutput 
	select @iReportId, P.PatientID, P.FirstName, P.OtherNames, P.Surname, P.PatientId, '',
		   F.ID, F.FormName, Q.SectionId, Q.SectionSortOrder, S.SectionType,
		   Q.ID, Question, Q.QuestionInSectionSortOrder, Q.QuestionType,
		   -1, -1, '', '', '', '', '', ''
	from tblPatientDetails P, tblFormType F, tblQuestions Q, tblSection S
	where P.PatientId = @piPatientId
	and F.ID = @piFormId
	and F.Active = 1
	and Q.FormTypeId = F.ID
	and Q.Active = 1
	and Q.SectionId = S.Id

	update O set PatientResultScore = PR.Score, PatientResultScale = PR.Scale,PatientNotes = PR.Notes, 
				 Datapoint1 = PR.DataPoint1, Datapoint2 = PR.DataPoint2, Datapoint3 = PR.DataPoint3,
				 Datapoint4 = PR.DataPoint4, Datapoint5 = PR.DataPoint5
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
/****** Object:  StoredProcedure [dbo].[SP_SetPatientFormResults]    Script Date: 7/01/2025 12:38:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



ALTER proc [dbo].[SP_SetPatientFormResults] 

	@piFormId int,
	@piPatientId int,
	@piQuestionId int,
	@pdtFormDate datetime,
	@pfScore float,
	@pfScale float,
	@pvchNotes nvarchar(1000),
	@pvchDataPoint1 nvarchar(1000),
	@pvchDataPoint2 nvarchar(1000),
	@pvchDataPoint3 nvarchar(1000),
	@pvchDataPoint4 nvarchar(1000),
	@pvchDataPoint5 nvarchar(1000),
	@pvchUser nvarchar(100),
	@piReportId int,
	@piNewReport bit 
as

begin

	SET NOCOUNT ON

	update tblPatientResults set LatestIteration = 0 where PatientId = @piPatientId and QuestionId = @piQuestionId

	if(@piNewReport = 1)
	begin
		insert tblPatientResults (PatientId, FormId, ReportId, QuestionId, Score, Scale, Notes, 
				DataPoint1, DataPoint2, DataPoint3, DataPoint4, DataPoint5, DateSaved, UserSaved, LatestIteration)
				values (@piPatientId, @piFormId, @piReportId, @piQuestionId, @pfScore, @pfScale, @pvchNotes,
				@pvchDataPoint1, @pvchDataPoint2, @pvchDataPoint3, @pvchDataPoint4, @pvchDataPoint5, GetDate(), @pvchUser, 1)
	end
	else
	begin 
		update tblPatientResults set
		FormId = @piFormId, 
		Score = @pfScore, 
		Scale = @PfScale, 
		Notes = @pvchNotes, 
		DataPoint1 = @pvchDataPoint1, 
		DataPoint2 = @pvchDataPoint2, 
		DataPoint3 = @pvchDataPoint3, 
		DataPoint4 = @pvchDataPoint4, 
		DataPoint5 = @pvchDataPoint5, 
		DateSaved = GetDate(), 
		UserSaved = @pvchUser, 
		LatestIteration = 1
		where ReportId = @piReportId
		and PatientId = @piPatientId
		and QuestionId = @piQuestionId
	end

	select @piReportId as ReportId

END

GO



USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_SetPatientFormReport]    Script Date: 7/01/2025 12:38:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[SP_SetPatientFormReport] 

	@piFormId int,
	@piPatientId int,
	@pdtFormDate datetime
as

begin

	SET NOCOUNT ON

	declare @iReportId int

	set @iReportId = -1

	insert tblReport (FormId, PatientId, FormDate) values (@piFormId,@piPatientId, @pdtFormDate)

	SELECT @iReportId = SCOPE_IDENTITY()

	select @iReportId as ReportId

END

GO


USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_SetPatientFormResults]    Script Date: 7/01/2025 8:02:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



ALTER proc [dbo].[SP_SetPatientFormResults] 

	@piFormId int,
	@piPatientId int,
	@piQuestionId int,
	@pdtFormDate datetime,
	@pfScore float,
	@pfScale float,
	@pvchNotes nvarchar(1000),
	@pvchDataPoint1 nvarchar(1000),
	@pvchDataPoint2 nvarchar(1000),
	@pvchDataPoint3 nvarchar(1000),
	@pvchDataPoint4 nvarchar(1000),
	@pvchDataPoint5 nvarchar(1000),
	@pvchUser nvarchar(100),
	@piReportId int,
	@piNewReport bit 
as

begin

	SET NOCOUNT ON

	update tblPatientResults set LatestIteration = 0 where PatientId = @piPatientId and QuestionId = @piQuestionId

	declare @iExists int
	set @iExists = -1

	select @iExists = count(*) from tblPatientResults where ReportId = @piReportId and QuestionId =  @piQuestionId

	if(@piNewReport = 1 or @iExists < 0)
	begin
		insert tblPatientResults (PatientId, FormId, ReportId, QuestionId, Score, Scale, Notes, 
				DataPoint1, DataPoint2, DataPoint3, DataPoint4, DataPoint5, DateSaved, UserSaved, LatestIteration)
				values (@piPatientId, @piFormId, @piReportId, @piQuestionId, @pfScore, @pfScale, @pvchNotes,
				@pvchDataPoint1, @pvchDataPoint2, @pvchDataPoint3, @pvchDataPoint4, @pvchDataPoint5, GetDate(), @pvchUser, 1)
	end
	else
	begin 
		update tblPatientResults set
		FormId = @piFormId, 
		Score = @pfScore, 
		Scale = @PfScale, 
		Notes = @pvchNotes, 
		DataPoint1 = @pvchDataPoint1, 
		DataPoint2 = @pvchDataPoint2, 
		DataPoint3 = @pvchDataPoint3, 
		DataPoint4 = @pvchDataPoint4, 
		DataPoint5 = @pvchDataPoint5, 
		DateSaved = GetDate(), 
		UserSaved = @pvchUser, 
		LatestIteration = 1
		where ReportId = @piReportId
		and PatientId = @piPatientId
		and QuestionId = @piQuestionId
	end

	select @piReportId as ReportId

END

GO


USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_SetPatientFormResults]    Script Date: 7/01/2025 8:02:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



ALTER proc [dbo].[SP_SetPatientFormResults] 

	@piFormId int,
	@piPatientId int,
	@piQuestionId int,
	@pdtFormDate datetime,
	@pfScore float,
	@pfScale float,
	@pvchNotes nvarchar(1000),
	@pvchDataPoint1 nvarchar(1000),
	@pvchDataPoint2 nvarchar(1000),
	@pvchDataPoint3 nvarchar(1000),
	@pvchDataPoint4 nvarchar(1000),
	@pvchDataPoint5 nvarchar(1000),
	@pvchUser nvarchar(100),
	@piReportId int,
	@piNewReport bit 
as

begin

	SET NOCOUNT ON

	update tblPatientResults set LatestIteration = 0 where PatientId = @piPatientId and QuestionId = @piQuestionId

	declare @iExists int
	set @iExists = -1

	select @iExists = count(*) from tblPatientResults where ReportId = @piReportId and QuestionId =  @piQuestionId

	if(@piNewReport = 1 or @iExists <= 0)
	begin
		insert tblPatientResults (PatientId, FormId, ReportId, QuestionId, Score, Scale, Notes, 
				DataPoint1, DataPoint2, DataPoint3, DataPoint4, DataPoint5, DateSaved, UserSaved, LatestIteration)
				values (@piPatientId, @piFormId, @piReportId, @piQuestionId, @pfScore, @pfScale, @pvchNotes,
				@pvchDataPoint1, @pvchDataPoint2, @pvchDataPoint3, @pvchDataPoint4, @pvchDataPoint5, GetDate(), @pvchUser, 1)
	end
	else
	begin 
		update tblPatientResults set
		FormId = @piFormId, 
		Score = @pfScore, 
		Scale = @PfScale, 
		Notes = @pvchNotes, 
		DataPoint1 = @pvchDataPoint1, 
		DataPoint2 = @pvchDataPoint2, 
		DataPoint3 = @pvchDataPoint3, 
		DataPoint4 = @pvchDataPoint4, 
		DataPoint5 = @pvchDataPoint5, 
		DateSaved = GetDate(), 
		UserSaved = @pvchUser, 
		LatestIteration = 1
		where ReportId = @piReportId
		and PatientId = @piPatientId
		and QuestionId = @piQuestionId
	end

	select @piReportId as ReportId

END

GO
