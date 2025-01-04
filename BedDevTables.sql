USE [Corryong]
GO

/****** Object:  Table [dbo].[tblResident]    Script Date: 28/08/2024 11:03:00 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblResident](
	[Id] [int]  identity(1,1) NOT NULL,
	[FirstName] [nvarchar](60) NULL,
	[MiddleName] [nvarchar](60) NULL,
	[LastName] [nvarchar](60) NULL,
 CONSTRAINT [PK_tblResident] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[tblResident]    Script Date: 28/08/2024 11:03:00 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblResidentBed](
	[ResidentId] [int] NOT NULL,
	[BedNo] [int] NOT NULL,
)
GO

insert tblResident (FirstName, MiddleName, LastName) values ('Jane', 'Anne', 'Citizen')
insert tblResident (FirstName, MiddleName, LastName) values ('Mary', '', 'Shelley')
insert tblResident (FirstName, MiddleName, LastName) values ('John', 'Paul', 'Smith')
insert tblResident (FirstName, MiddleName, LastName) values ('Elanor', '', 'Roosevelt')

insert tblResidentBed (ResidentId, BedNo) values (1,1)
insert tblResidentBed (ResidentId, BedNo) values (2,2)
insert tblResidentBed (ResidentId, BedNo) values (3,3)
insert tblResidentBed (ResidentId, BedNo) values (4,4)


GO


USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_GetBeds]    Script Date: 28/08/2024 11:11:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



ALTER proc [dbo].[SP_GetBeds] 

as

begin
	select B.ResidentId, B.BedNo, R.LastName, isnull(R.FirstName, '') + case when R.MiddleName is null or R.MiddleName = '' then '' else ' ' + R.MiddleName end as FirstNames
	from tblResidentBed B, tblResident R
	where B.ResidentId = R.Id
	order by 1
END

GO



USE [Corryong]
GO

/****** Object:  Table [dbo].[tblHandoverInfo]    Script Date: 28/08/2024 11:03:00 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblHandoverInfo](
	[Id] [int]  identity(1,1) NOT NULL,
	[ResidentId] [int] NOT NULL,
	[BedNo] [int] NOT NULL,
	[Diagnosis] [nvarchar](1000) NULL,
 CONSTRAINT [PK_tblHandoverInfo] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_SetHandover]    Script Date: 28/08/2024 11:11:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE proc [dbo].[SP_SetHandover] 

	@piResidentId int,
	@piBedNo int,
	@pvchDiagnosis nvarchar(1000)

as

begin
	insert tblHandoverInfo (BedNo, ResidentId, Diagnosis) values (@piBedNo, @piResidentId, @pvchDiagnosis)
END

GO


USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_SetHandover]    Script Date: 28/08/2024 11:11:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



ALTER proc [dbo].[SP_SetHandover] 

	@piResidentId int,
	@piBedNo int,
	@pvchDiagnosis nvarchar(1000)

as

begin
	insert tblHandoverInfo (BedNo, ResidentId, Diagnosis) values (@piBedNo, @piResidentId, @pvchDiagnosis)
	SELECT SCOPE_IDENTITY() as Id 
END

GO


USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_GetBeds]    Script Date: 28/08/2024 5:39:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



ALTER proc [dbo].[SP_GetBeds] 

as

begin
	select B.ResidentId, B.BedNo, R.LastName, isnull(R.FirstName, '') + case when R.MiddleName is null or R.MiddleName = '' then '' else ' ' + R.MiddleName end as FirstNames,
	isnull(H.Diagnosis,'') as Diagnosis
	from tblResident R, tblResidentBed B
	left outer join tblHandoverInfo H
	on B.ResidentId = H.ResidentId
	and B.BedNo = H.BedNo
	where B.ResidentId = R.Id
	order by 1
END

GO


USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_GetBeds]    Script Date: 28/08/2024 5:39:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



ALTER proc [dbo].[SP_GetBeds] 

as

begin
	select B.ResidentId, B.BedNo, R.LastName, isnull(R.FirstName, '') + case when R.MiddleName is null or R.MiddleName = '' then '' else ' ' + R.MiddleName end as FirstNames,
	isnull(H.Diagnosis,'') as Diagnosis, isnull(H.Id,-1) as HandoverId
	from tblResident R, tblResidentBed B
	left outer join tblHandoverInfo H
	on B.ResidentId = H.ResidentId
	and B.BedNo = H.BedNo
	where B.ResidentId = R.Id
	order by 1
END

GO


USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_SetHandover]    Script Date: 28/08/2024 11:11:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



ALTER proc [dbo].[SP_SetHandover] 

	@piHandoverId int,
	@piResidentId int,
	@piBedNo int,
	@pvchDiagnosis nvarchar(1000)

as

begin
	if(@piHandoverId < 0)
	begin
		insert tblHandoverInfo (BedNo, ResidentId, Diagnosis) values (@piBedNo, @piResidentId, @pvchDiagnosis)
		SELECT SCOPE_IDENTITY() as Id 
	end
	else
	begin
		update tblHandoverInfo
		set BedNo = @piBedNo,
			ResidentId = @piResidentId,
			Diagnosis = @pvchDiagnosis
		where Id = @piHandoverId
	end
END

GO


USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_SetHandover]    Script Date: 28/08/2024 11:11:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



ALTER proc [dbo].[SP_SetHandover] 

	@piHandoverId int,
	@piResidentId int,
	@piBedNo int,
	@pvchDiagnosis nvarchar(1000)

as

begin
	if(@piHandoverId < 0)
	begin
		insert tblHandoverInfo (BedNo, ResidentId, Diagnosis) values (@piBedNo, @piResidentId, @pvchDiagnosis)
		SELECT SCOPE_IDENTITY() as Id 
	end
	else
	begin
		update tblHandoverInfo
		set BedNo = @piBedNo,
			ResidentId = @piResidentId,
			Diagnosis = @pvchDiagnosis
		where Id = @piHandoverId
		select @piHandoverId as Id
	end
END

GO

USE [Corryong]
GO
/****** Object:  StoredProcedure [dbo].[SP_SetHandover]    Script Date: 28/08/2024 11:11:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



ALTER proc [dbo].[SP_SetHandover] 

	@piHandoverId int,
	@piResidentId int,
	@piBedNo int,
	@pvchDiagnosis nvarchar(1000)

as

begin
	if(@piHandoverId < 0)
	begin
		insert tblHandoverInfo (BedNo, ResidentId, Diagnosis) values (@piBedNo, @piResidentId, @pvchDiagnosis)
		SELECT SCOPE_IDENTITY() as HandoverId 
	end
	else
	begin
		update tblHandoverInfo
		set BedNo = @piBedNo,
			ResidentId = @piResidentId,
			Diagnosis = @pvchDiagnosis
		where Id = @piHandoverId
		select @piHandoverId as HandoverId
	end
END

GO

