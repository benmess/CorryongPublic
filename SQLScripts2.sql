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

USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_GetPatientSearch]    Script Date: 9/01/2025 8:45:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[SP_GetPatientSearch] 

	@pvchPatientId nvarchar(20),
	@pvchSurname nvarchar(50)
as

begin

	SET NOCOUNT ON

	select *
	from tblAllPatients
	where cast(Id as nvarchar(20)) like '%' + @pvchPatientId + '%'
	and Surname like '%' + @pvchSurname + '%'
END

GO


USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_GetPatientFormResults]    Script Date: 9/01/2025 7:48:23 PM ******/
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

	--declare @piFormId int
	--declare @piPatientId int

	--set @piFormId= 1
	--set @piPatientId = 2

	declare @tblOutput table (ReportId int, PatientId int, FirstName nvarchar(60), MiddleName nvarchar(60), LastName nvarchar(60), CorryongId int, MedicareNo nvarchar(40), 
							  FormId int, FormName nvarchar(200), SectionId int, SectionSortOrder int, SectionTypeId int, 
							  QuestionId int, Question nvarchar(1000), QuestionInSectionSortOrder int,QuestionType int,
							  PatientResultScore float,  PatientResultScale float, PatientNotes nvarchar(4000), 
							  Datapoint1 nvarchar(1000), Datapoint2 nvarchar(1000), Datapoint3 nvarchar(1000), Datapoint4 nvarchar(1000), Datapoint5 nvarchar(1000))
	declare @iReportId int

	set @iReportId = -1

	select @iReportId = ID from tblReport where PatientId = @piPatientId and FormId = @piFormId and FormDate = cast(GetDate() as date)

	insert @tblOutput 
	select @iReportId, P.Id, P.FirstName, '', P.Surname, P.Id, '',
		   F.ID, F.FormName, Q.SectionId, Q.SectionSortOrder, S.SectionType,
		   Q.ID, Question, Q.QuestionInSectionSortOrder, Q.QuestionType,
		   -1, -1, '', '', '', '', '', ''
	from tblAllPatients P, tblFormType F, tblQuestions Q, tblSection S
	where P.Id = @piPatientId
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


Use Corryong

GO

alter table tblQuestions add QuestionDetails nvarchar(500) NULL

GO


USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_GetPatientFormResults]    Script Date: 10/01/2025 8:24:23 PM ******/
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

	--declare @piFormId int
	--declare @piPatientId int

	--set @piFormId= 1
	--set @piPatientId = 2

	declare @tblOutput table (ReportId int, PatientId int, FirstName nvarchar(60), MiddleName nvarchar(60), LastName nvarchar(60), CorryongId int, MedicareNo nvarchar(40), 
							  FormId int, FormName nvarchar(200), SectionId int, SectionSortOrder int, SectionTypeId int, 
							  QuestionId int, Question nvarchar(1000), QuestionDetails nvarchar(1000), QuestionInSectionSortOrder int,QuestionType int,
							  PatientResultScore float,  PatientResultScale float, PatientNotes nvarchar(4000), 
							  Datapoint1 nvarchar(1000), Datapoint2 nvarchar(1000), Datapoint3 nvarchar(1000), Datapoint4 nvarchar(1000), Datapoint5 nvarchar(1000))
	declare @iReportId int

	set @iReportId = -1

	select @iReportId = ID from tblReport where PatientId = @piPatientId and FormId = @piFormId and FormDate = cast(GetDate() as date)

	insert @tblOutput 
	select @iReportId, P.Id, P.FirstName, '', P.Surname, P.Id, '',
		   F.ID, F.FormName, Q.SectionId, Q.SectionSortOrder, S.SectionType,
		   Q.ID, Q.Question, isnull(Q.QuestionDetails,'') as QuestionDetails,Q.QuestionInSectionSortOrder, Q.QuestionType,
		   -1, -1, '', '', '', '', '', ''
	from tblAllPatients P, tblFormType F, tblQuestions Q, tblSection S
	where P.Id = @piPatientId
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


Use Corryong

GO

alter table tblQuestions add QuestionHTML nvarchar(500) NULL, IsHTML int NULL

GO


update tblQuestions set QuestionHTML = '', IsHTML = 0

GO


USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_GetPatientFormResults]    Script Date: 11/01/2025 9:29:38 AM ******/
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

	--declare @piFormId int
	--declare @piPatientId int

	--set @piFormId= 1
	--set @piPatientId = 2

	declare @tblOutput table (ReportId int, PatientId int, FirstName nvarchar(60), MiddleName nvarchar(60), LastName nvarchar(60), CorryongId int, MedicareNo nvarchar(40), 
							  FormId int, FormName nvarchar(200), SectionId int, SectionSortOrder int, SectionTypeId int, 
							  QuestionId int, Question nvarchar(1000), QuestionHTML nvarchar(1000), IsHTML int, QuestionDetails nvarchar(1000), QuestionInSectionSortOrder int,QuestionType int,
							  PatientResultScore float,  PatientResultScale float, PatientNotes nvarchar(4000), 
							  Datapoint1 nvarchar(1000), Datapoint2 nvarchar(1000), Datapoint3 nvarchar(1000), Datapoint4 nvarchar(1000), Datapoint5 nvarchar(1000))
	declare @iReportId int

	set @iReportId = -1

	select @iReportId = ID from tblReport where PatientId = @piPatientId and FormId = @piFormId and FormDate = cast(GetDate() as date)

	insert @tblOutput 
	select @iReportId, P.Id, P.FirstName, '', P.Surname, P.Id, '',
		   F.ID, F.FormName, Q.SectionId, Q.SectionSortOrder, S.SectionType,
		   Q.ID, Q.Question, isnull(Q.QuestionHTML,''), isnull(Q.IsHTML,0), isnull(Q.QuestionDetails,'') as QuestionDetails,Q.QuestionInSectionSortOrder, Q.QuestionType,
		   -1, -1, '', '', '', '', '', ''
	from tblAllPatients P, tblFormType F, tblQuestions Q, tblSection S
	where P.Id = @piPatientId
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


Use Corryong

GO

/* To prevent any potential data loss issues, you should review this script in detail before running it outside the context of the database designer.*/
BEGIN TRANSACTION
SET QUOTED_IDENTIFIER ON
SET ARITHABORT ON
SET NUMERIC_ROUNDABORT OFF
SET CONCAT_NULL_YIELDS_NULL ON
SET ANSI_NULLS ON
SET ANSI_PADDING ON
SET ANSI_WARNINGS ON
COMMIT
BEGIN TRANSACTION
GO
CREATE TABLE dbo.Tmp_tblQuestions
	(
	ID int NOT NULL IDENTITY (1, 1),
	Question nvarchar(1000) NULL,
	Active int NULL,
	FormTypeId int NULL,
	SectionId int NULL,
	SectionSortOrder int NULL,
	QuestionInSectionSortOrder int NULL,
	QuestionType int NULL,
	QuestionDetails nvarchar(500) NULL,
	QuestionHTML nvarchar(1000) NULL,
	IsHTML int NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.Tmp_tblQuestions SET (LOCK_ESCALATION = TABLE)
GO
ALTER TABLE dbo.Tmp_tblQuestions ADD CONSTRAINT
	DF_tblQuestions_QuestionHTML DEFAULT '' FOR QuestionHTML
GO
ALTER TABLE dbo.Tmp_tblQuestions ADD CONSTRAINT
	DF_tblQuestions_IsHTML DEFAULT 0 FOR IsHTML
GO
SET IDENTITY_INSERT dbo.Tmp_tblQuestions ON
GO
IF EXISTS(SELECT * FROM dbo.tblQuestions)
	 EXEC('INSERT INTO dbo.Tmp_tblQuestions (ID, Question, Active, FormTypeId, SectionId, SectionSortOrder, QuestionInSectionSortOrder, QuestionType, QuestionDetails, QuestionHTML, IsHTML)
		SELECT ID, Question, Active, FormTypeId, SectionId, SectionSortOrder, QuestionInSectionSortOrder, QuestionType, QuestionDetails, QuestionHTML, IsHTML FROM dbo.tblQuestions WITH (HOLDLOCK TABLOCKX)')
GO
SET IDENTITY_INSERT dbo.Tmp_tblQuestions OFF
GO
DROP TABLE dbo.tblQuestions
GO
EXECUTE sp_rename N'dbo.Tmp_tblQuestions', N'tblQuestions', 'OBJECT' 
GO
ALTER TABLE dbo.tblQuestions ADD CONSTRAINT
	PK_tblQuestions PRIMARY KEY CLUSTERED 
	(
	ID
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
COMMIT

/*************************************************************/
/*   Completed BBM 12/02/2025								 */
/*************************************************************/


USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_GetPatientSearch]    Script Date: 12/01/2025 10:02:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



ALTER proc [dbo].[SP_GetPatientSearch] 

	@pvchPatientId nvarchar(20),
	@pvchSurname nvarchar(50),
	@pvchFirstName nvarchar(50),
	@pvchAddress nvarchar(50),
	@pvchCity nvarchar(50),
	@pvchPostcode nvarchar(50),
	@pvchMedicare nvarchar(50),
	@pvchPhone nvarchar(50)
as

begin

	SET NOCOUNT ON

	select *
	from tblAllPatients
	where cast(Id as nvarchar(20)) like '%' + @pvchPatientId + '%'
	and Surname like '%' + @pvchSurname + '%'
	and FirstName like '%' + @pvchFirstName + '%'
	and Address like '%' + @pvchAddress + '%'
	and City like '%' + @pvchCity + '%'
	and Postcode like '%' + @pvchPostcode + '%'
	and Medicare like '%' + @pvchMedicare + '%'
	and (Home_Phone like '%' + @pvchPhone + '%' or Mobile_Phone like '%' + @pvchPhone + '%')
END

GO

USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_GetPatientSearch]    Script Date: 12/01/2025 10:02:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



ALTER proc [dbo].[SP_GetPatientSearch] 

	@pvchPatientId nvarchar(20),
	@pvchSurname nvarchar(50),
	@pvchFirstName nvarchar(50),
	@pvchAddress nvarchar(50),
	@pvchCity nvarchar(50),
	@pvchPostcode nvarchar(50),
	@pvchMedicare nvarchar(50),
	@pvchPhone nvarchar(50)
as

begin

	SET NOCOUNT ON

	select *
	from tblAllPatients
	where cast(Id as nvarchar(20)) like '%' + @pvchPatientId + '%'
	and Surname like '%' + @pvchSurname + '%'
	and FirstName like '%' + @pvchFirstName + '%'
	and Address like '%' + @pvchAddress + '%'
	and City like '%' + @pvchCity + '%'
	and Postcode like '%' + @pvchPostcode + '%'
	and Medicare like '%' + @pvchMedicare + '%'
	and (Home_Phone like '%' + @pvchPhone + '%' or Mobile_Phone like '%' + @pvchPhone + '%')
	order by Surname, Firstname, DOB_AGE
END

GO


USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_GetPatient]    Script Date: 14/01/2025 10:35:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[SP_GetPatient] 

	@piPatientId nvarchar(20)
as

begin

	SET NOCOUNT ON

	select *
	from tblAllPatients
	where Id =  @piPatientId
END


GO


USE [Corryong]
GO

/****** Object:  Table [dbo].[tblNextOfKin]    Script Date: 15/01/2025 8:09:13 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblNextOfKin](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[PatientId] [int] NULL,
	[FormId] [int] NULL,
	[ReportId] [int] NULL,
	[Name] [nvarchar](250) NULL,
	[Address] [nvarchar](250) NULL,
	[Phone] [nvarchar](250) NULL,
 CONSTRAINT [PK_tblNextOfKin] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_GetPatientNextOfKin]    Script Date: 15/01/2025 8:14:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[SP_GetPatientNextOfKin] 

	@piReportId nvarchar(20)
as

begin

	SET NOCOUNT ON

	select *
	from tblNextOfKin
	where ReportId =  @piReportId
END


GO


USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_GetPatientNextOfKin]    Script Date: 15/01/2025 8:28:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



ALTER proc [dbo].[SP_GetPatientNextOfKin] 

	@piReportId nvarchar(20),
	@piFormId int,
	@piPatientId int
as

begin

	SET NOCOUNT ON

	declare @iReportId int

	set @iReportId = -1

	if(@piReportId <0)
	begin
		select @iReportId = ID from tblReport where PatientId = @piPatientId and FormId = @piFormId and FormDate = cast(GetDate() as date)
	end
	else
	begin
		set @iReportId = @piReportId
	end

	select *
	from tblNextOfKin
	where ReportId =  @iReportId

END

GO

