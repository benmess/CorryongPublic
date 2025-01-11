--drop table tblQuestions

--GO

Use Corryong

GO



select * from tblQuestions


/***************** SECTION PATIENT CONSENT (1) ***********/
insert tblSection (SectionName, SectionType) values ('Patient Consent', 1)
insert tblSectionType (SectionType) values ('2 columns, question and yes/no')

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Patient Consent', 1, 1, 1, 1, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^Yes=Y, No=N', 1, 1, 1, 1, 2, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Explanation of health check given', 1, 1, 1, 1, 3, 3)
insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Patient consent for health check was given', 1, 1, 1, 1, 4, 3)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Consent to share/refer to other health providers', 1, 1, 1, 1, 5, 3)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Comments', 1, 1, 1, 1, 6, 4)

/***************** SECTION PREVIOUS HEALTH CHECK (2) ***********/
insert tblSection (SectionName, SectionType) values ('Previous Health Check', 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Previous Health Check', 1, 1, 2, 2, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^Yes=Y, No=N', 1, 1, 2, 2, 2, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Has the patient had a previous health check? When?', 1, 1, 2, 2, 3, 3)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Previous health check completed by (GP/Practice Name and details', 1, 1, 2, 2, 4, 3)

/***************** SECTION BACKGROUND INFORMATION (3) ***********/
insert tblSection (SectionName, SectionType) values ('Background Information', 2)
insert tblSectionType (SectionType) values ('2 columns, question and comments')

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Background Information', 1, 1, 3, 3, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^Comments', 1, 1, 3, 3, 2, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('How do you think your current health is?', 1, 1, 3, 3, 3, 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('What is your biggest concern today?', 1, 1, 3, 3, 4, 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Has this stopped you from doing the things you want to do?', 1, 1, 3, 3, 5, 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Goals for health and wellbeing are:', 1, 1, 3, 3, 6, 6)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('1.', 1, 1, 3, 3, 7, 7)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('2.', 1, 1, 3, 3, 8, 7)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('3.', 1, 1, 3, 3, 9, 8)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Have you seen any other Doctor/GP/Specialist in the last 6 months?', 1, 1, 3, 3,10, 9)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Name and Details', 1, 1, 3, 3,11, 10)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Have you been to hospital / ED in the last 12 months?', 1, 1, 3, 3,12, 11)

/***************** SECTION LEGAL ISSUES (4) ***********/
insert tblSection (SectionName, SectionType) values ('Legal Issues', 3)
insert tblSectionType (SectionType) values ('3 columns, question, comments and yes/no')

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Legal Issues', 1, 1, 4, 4, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^Comments^Yes=Y, No=N', 1, 1, 4, 4, 2, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Have you made any arrangements for enduring power of attorney should it become necessary?', 1, 1, 4, 4, 3, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Have you made any arrangements for guardianship should it become necessary? ', 1, 1, 4, 4, 4, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('If you were ill and unable to make decisions for yourself have you appointed a substitute decision maker or made an Advanced Care Directive?', 1, 1, 4, 4, 5, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('REFERRALS or ACTIONS REQUIRED', 1, 1, 4, 4, 6, 4)

/***************** SECTION OTHER HEALTH CARE PROVIDERS /SERVICES (5) ***********/
insert tblSection (SectionName, SectionType) values ('Other Health Care Providers /Services', 4)
insert tblSectionType (SectionType) values ('3 columns, question, yes/no and details/comments')

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Other Health Care Providers /Services', 1, 1, 5, 5, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Do you get regular health care from any of these sources?', 1, 1, 5, 5, 2, 14)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^Yes=Y, No=N^Provider details/ contact', 1, 1, 5, 5, 3, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Audiologist or optometrist', 1, 1, 5, 5, 4, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Community nursing', 1, 1, 5, 5, 5, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Continence adviser', 1, 1, 5, 5, 6, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Dietitian', 1, 1, 5, 5, 7, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Pharmacist', 1, 1, 5, 5, 8, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Physiotherapy', 1, 1, 5, 5, 9, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Exercise Physiologist ', 1, 1, 5, 5, 10, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Podiatry', 1, 1, 5, 5, 11, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Psychologist / counsellor', 1, 1, 5, 5, 12, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Registered nurse', 1, 1, 5, 5, 13, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Social worker', 1, 1, 5, 5, 14, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Speech pathologist', 1, 1, 5, 5, 15, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Occupational therapist', 1, 1, 5, 5, 16, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Other', 1, 1, 5, 5, 17, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Community Services^Yes=Y, No=N^Provider details/ contact', 1, 1, 5, 5, 18, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Home Help - additional paid / unpaid', 1, 1, 5, 5, 19, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Home maintenance service', 1, 1, 5, 5, 20, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Meals on Wheels or other food provider service', 1, 1, 5, 5, 21, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Day Activity Centre', 1, 1, 5, 5, 22, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Home care services', 1, 1, 5, 5, 23, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Equipment', 1, 1, 5, 5, 24, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Home modifications', 1, 1, 5, 5, 25, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('District nurse or other nursing services', 1, 1, 5, 5, 26, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Personal care', 1, 1, 5, 5, 27, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Community care coordinator', 1, 1, 5, 5, 28, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Transport provider', 1, 1, 5, 5, 29, 15)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Do you have ambulance cover ?', 1, 1, 5, 5, 30, 16)

/***************** SECTION MEDICAL HISTORY (Active Items) (6) ***********/
insert tblSection (SectionName, SectionType) values ('Medical History (Active Items)', 5)
insert tblSectionType (SectionType) values ('A single column of just comments')

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Medical History (Active Items)', 1, 1, 6, 6, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('', 1, 1, 6, 6, 2, 17)

/***************** SECTION RELEVANT FAMILY HISTORY (7) ***********/
insert tblSection (SectionName, SectionType) values ('Relevant Family History', 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Relevant Family History', 1, 1, 7, 7, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('', 1, 1, 7, 7, 2, 17)

/***************** SECTION ALLERGIES (Includes Reactions) (8) ***********/
insert tblSection (SectionName, SectionType) values ('Allergies (Includes Reactions)', 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Allergies (Includes Reactions)', 1, 1, 8, 8, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('', 1, 1, 8, 8, 2, 17)

/***************** SECTION IMMUNISATION STATUS (9) ***********/
insert tblSection (SectionName, SectionType) values ('Immunisation Status', 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Immunisation Status', 1, 1, 9, 9, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('', 1, 1, 9, 9, 2, 17)

/***************** SECTION MEDICATIONS (10) ***********/
insert tblSection (SectionName, SectionType) values ('Medications', 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Medications', 1, 1, 10, 10, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^Comments', 1, 1, 10, 10, 2, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('What medicines do you take and why?', 1, 1, 10, 10, 3, 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Are you reluctant to take any medicines?', 1, 1, 10, 10, 4, 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('When were your medicines last reviewed?', 1, 1, 10, 10, 5, 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Has there been any changes in your life since that review?', 1, 1, 10, 10, 6, 5)

/***************** ALCOHOL (11) ***********/
insert tblSection (SectionName, SectionType) values ('Alcohol', 6)
insert tblSectionType (SectionType) values ('A single column with data points')

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Alcohol', 1, 1, 11, 11, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Do you drink Alcohol? How many drinks per Day: <Datapoint> Week: <Datapoint> Social Drinker: <Datapoint>', 1, 1, 11, 11, 2, 18)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Comments: Referral?', 1, 1, 11, 11, 3, 4)

/***************** SMOKING (12) ***********/
insert tblSection (SectionName, SectionType) values ('Smoking', 6)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Smoking', 1, 1, 12, 12, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Do you smoke? How many cigarettes per Day: <Datapoint> Week: <Datapoint> Social Smoker: <Datapoint>', 1, 1, 12, 12, 2, 18)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Comments: Referral?', 1, 1, 12, 12, 3, 4)

/***************** SECTION SOCIAL HISTORY (13) ***********/
insert tblSection (SectionName, SectionType) values ('Social History', 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Social History', 1, 1, 13, 13, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^Comments', 1, 1, 13, 13, 2, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Do you speak with people regularly?', 1, 1, 13, 13, 3, 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Do you care for someone else? If yes, how many hours per day?', 1, 1, 13, 13, 4, 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Are you cared for by someone else?Concerns?', 1, 1, 13, 13, 5, 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('What is the current housing situation? Concerns?', 1, 1, 13, 13, 6, 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Is there anything or anyone that gets in your way of being who you want to be?', 1, 1, 13, 13, 7, 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Do you volunteer for any organisation?', 1, 1, 13, 13, 8, 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Have you had any recent stressful events?', 1, 1, 13, 13, 9, 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Do you have any issues or concerns regarding transport?If yes, please identify.', 1, 1, 13, 13, 10, 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('During the last 4 weeks, was someone available to help if needed / wanted help (For example if you: felt very nervous, lonely or sad, became sick and had to stay in bed, needed someone to talk to, needed help with daily chores, needed help just taking care of yourself)?', 1, 1, 13, 13, 11, 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Are there any clubs or activities I am interested in being part of', 1, 1, 13, 13, 12, 5)

/***************** SECTION VISION (14) ***********/
insert tblSection (SectionName, SectionType) values ('Vision', 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Vision', 1, 1, 14, 14, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^Comments', 1, 1, 14, 14, 2, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Do you have problems with your eyesight?', 1, 1, 14, 14, 3, 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Have you had an eye test this year?', 1, 1, 14, 14, 4, 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Are you able to read newspapers and books, and watch TV?', 1, 1, 14, 14, 4, 5)

/***************** SECTION HOME SAFETY & RISK FOR FALLS / INJURIES (15) ***********/
insert tblSection (SectionName, SectionType) values ('Home Safety & Risk for Falls/ Injuries', 3)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Home Safety & Risk for Falls/ Injuries', 1, 1, 15, 15, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^Comments^Yes=Y, No=N', 1, 1, 15, 15, 2, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Have you had a fall in the past 3 months? If yes, how many?', 1, 1, 15, 15, 3, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Were you hurt as a result of any of these falls?', 1, 1, 15, 15, 4, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('What were you doing when you fell?', 1, 1, 15, 15, 5, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Did you need assistance to get up from the floor?', 1, 1, 15, 15, 6, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Have you had any unsteadiness or ''near-miss falls'' in the past 3 months?', 1, 1, 15, 15, 7, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Do you have people or aids to support you?', 1, 1, 15, 15, 8, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Do you need any safety equipment (eg: walking aid, home modifications, grab rails fitted)?', 1, 1, 15, 15, 9, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Is the house free of obvious slipping and/or tripping hazards (e.g. floor mats that slip)?', 1, 1, 15, 15, 10, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Do you have smoke detectors fitted to your home? (If so, when was the battery last changed ?)', 1, 1, 15, 15, 11, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('REFERRALS or ACTIONS REQUIRED', 1, 1, 15, 15, 12, 4)

/***************** SECTION SKIN AND FEET (16) ***********/
insert tblSection (SectionName, SectionType) values ('Skin and Feet', 3)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Skin and Feet', 1, 1, 16, 16, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^Comments^Yes=Y, No=N', 1, 1, 16, 16, 2, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Do you have problems with one or both feet?', 1, 1, 16, 16, 3, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Are you able to manage your foot and toenail care?', 1, 1, 16, 16, 4, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Do you have any areas where your skin is itchy, red, sore, flaky?', 1, 1, 16, 16, 5, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Last Overall Skin Check? (Looking for skin cancers)', 1, 1, 16, 16, 6, 12)


insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('REFERRALS or ACTIONS REQUIRED', 1, 1, 16, 16, 7, 4)

/***************** SECTION NUTRITION (17) ***********/
insert tblSection (SectionName, SectionType) values ('Nutrition', 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Nutrition', 1, 1, 17, 17, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^Comments', 1, 1, 17, 17, 2, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Have you lost weight or not felt like eating?', 1, 1, 17, 17, 3, 5)

/***************** SECTION MNA SCREENING HISTORY (18) ***********/
insert tblSection (SectionName, SectionType) values ('MNA Screening', 7)
insert tblSectionType (SectionType) values ('A four column with scale and score')

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('', 1, 1, 18, 18, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('MNA Screening Tool http://www.mna-elderly.com', 1, 1, 18, 18, 2, 6)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^^Scale\n(0,1,2 or 3)^Score\n(Add all points)', 1, 1, 18, 18, 3, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType], [QuestionDetails]) 
values ('A. Has food intake declined over the past 3 months due to loss of appetite, digestive problems, chewing or swallowing difficulties?', 1, 1, 18, 18, 4, 19, 
'0= severe decrease in food intake\n1= moderate in food intake\n2= no decrease in food intake')

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType], [QuestionDetails]) 
values ('B. Weight loss during the last 3 months', 1, 1, 18, 18, 5, 19, 
'0= weight loss greater than 3 kg\n1= does not know\n2= weight loss between 1-3kg\n3= no weight loss')

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType], [QuestionDetails]) 
values ('C. Mobility', 1, 1, 18, 18, 6, 19, 
'0= bed or chair bound\n1= able to get out of bed/ chair but does not go out\n2= goes out')

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType], [QuestionDetails]) 
values ('D. Has suffered psychological stress or acute disease in the past 3 months', 1, 1, 18, 18, 7, 19, 
'0= Yes\n2= No')

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType], [QuestionDetails]) 
values ('E. Neuropsychological problems', 1, 1, 18, 18, 8, 19, 
'0= Severe dementia or depression\n1= Mild dementia\n2= No psychological problems')

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType], [QuestionDetails]) 
values ('F. BMI', 1, 1, 18, 18, 9, 19, 
'0= less than 19\n1= BMI 19- but less than 21\n2= BMI 21 to less than 23\n3= BMI 23 or greater')

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType], [QuestionDetails]) 
values ('Total Score', 1, 1, 18, 18, 10, 19, 
'Screening score (total max 14 pts)\n12-14 pts     Normal nutritional status\n8-11   pts     At risk of malnutrition\n0-7     pts     Malnourished')

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Score of 0-7 points: Refer to dietician or geriatrician/aged care team for full nutritional assessment', 1, 1, 18, 18, 11, 20)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Score of 8-11 points: Address risk factors plus consider adding daily protein supplements (e.g. Hospital strength sustain), and refer for HMR', 1, 1, 18, 18, 12, 20)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('REFERRALS or ACTIONS REQUIRED', 1, 1, 18, 18, 13, 4)

/***************** SECTION ORAL HEALTH (19) ***********/
insert tblSection (SectionName, SectionType) values ('Oral Health', 3)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Oral Health', 1, 1, 19, 19, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^Comments^Yes=Y, No=N', 1, 1, 19, 19, 2, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Do you have any of your own natural teeth?', 1, 1, 19, 19, 3, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Have you had pain in your mouth while chewing?', 1, 1, 19, 19, 4, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Have you lost any fillings, or do you need a dental visit for any other reason?', 1, 1, 19, 19, 5, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Have you avoided laughing or smiling because of problems with your teeth, mouth, or dentures?', 1, 1, 19, 19, 6, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Have you had to interrupt meals because of problems with your teeth, mouth, or dentures?', 1, 1, 19, 19, 7, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Have you had difficulty relaxing or sleeping because of a problem with your teeth, mouth, or dentures?', 1, 1, 19, 19, 8, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('REFERRALS or ACTIONS REQUIRED\nConsider "Oral Health for Older People" referral', 1, 1, 19, 19, 9, 4)

/***************** SECTION HEARING (20) ***********/
insert tblSection (SectionName, SectionType) values ('Hearing', 3)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Hearing', 1, 1, 20, 20, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^Comments^Yes=Y, No=N', 1, 1, 20, 20, 2, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Do you have problems with hearing?', 1, 1, 20, 20, 3, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Have you had a hearing test this year?', 1, 1, 20, 20, 3, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('REFERRALS or ACTIONS REQUIRED', 1, 1, 20, 20, 4, 4)

/***************** SECTION COGNITION (21) ***********/
insert tblSection (SectionName, SectionType) values ('Cognition', 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Cognition', 1, 1, 21, 21, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^Comments', 1, 1, 21, 21, 2, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Are you worried about your concentration, memory or thinking', 1, 1, 21, 21, 3, 5)

/***************** SECTION COGNITION SCREEN (22) ***********/
insert tblSection (SectionName, SectionType) values ('Cognition Screen', 8)
insert tblSectionType (SectionType) values ('A 3 column with scale and score')

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Cognition Screen', 1, 1, 22, 22, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Perform GPCOG Screening Test http://gpcog.com.au/ template https://www.alz.org/documents_custom/gpcog(english).pdf', 1, 1, 22, 22, 2, 6)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^Scale\n(Correct / Incorrect)^Score\n(1 point for each correct answer)', 1, 1, 22, 22, 3, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Name and Address for subsequent recall test', 1, 1, 22, 22, 4, 6)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('1. “I am going to give you a name and address. After I have said it, I want you to repeat it. Remember this name and address because I am going to ask you to tell it to me again in a few minutes: John Brown, 42 West Street, Kensington.” (Allow a maximum of 4 attempts).', 1, 1, 22, 22, 5, 21)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Time Orientation', 1, 1, 22, 22, 6, 6)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('2. What is the date? (exact only)', 1, 1, 22, 22, 7, 21)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Clock Drawing – use blank page', 1, 1, 22, 22, 8, 6)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('3. Please mark in all the numbers to indicate the hours of a clock (correct spacing required)', 1, 1, 22, 22, 9, 21)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('4. Please mark in hands to show 10 minutes past eleven o’clock (11.10)', 1, 1, 22, 22, 10, 21)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Information', 1, 1, 22, 22, 11, 6)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('5. Can you tell me something that happened in the news recently? (Recently = in the last week. If a general answer is given, eg “war”, “lot of rain”, ask for details. Only specific answer scores)', 1, 1, 22, 22, 12, 21)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Recall ', 1, 1, 22, 22, 13, 6)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType], [QuestionHTML], [IsHTML]) 
values ('6. What was the name and address I asked you to remember. John Brown, 42 West St, Kensington', 1, 1, 22, 22, 14, 21,
'6. What was the name and address I asked you to remember<ul><li>John</li><li>Brown</li><li>42</li><li>West St</li><li>Kensington</li></ul>', 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Total Score (score out of 9)', 1, 1, 22, 22, 15, 21)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('To get a total score, add the number of items answered correctly', 1, 1, 22, 22, 16, 20)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('If patient scores 9, no significant cognitive impairment and further testing not necessary.', 1, 1, 22, 22, 17, 20)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('If patient scores 5-8, more information required. Proceed with Step 2, informant section.', 1, 1, 22, 22, 18, 20)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('If patient scores 0-4, cognitive impairment is indicated. Conduct standard investigations.', 1, 1, 22, 22, 19, 20)

/***************** SECTION GPCOG INFORMANT INTERVIEW (23) ***********/
insert tblSection (SectionName, SectionType) values ('GPCOG Informant Interview (if patient scores 5-8)', 8)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('GPCOG Informant Interview (if patient scores 5-8)', 1, 1, 23, 23, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Date: ', 1, 1, 23, 23, 2, 23)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Informant''s name:', 1, 1, 23, 23, 3, 4)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Informant''s relationship to patient: (i.e. Informant is the patient''s)', 1, 1, 23, 23, 4, 4)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType], [QuestionHTML], [IsHTML]) 
values ('These 6 questions ask how the patient is compared to when s/he was well, say 5-10 years ago. Compared to a few years ago:', 1, 1, 23, 23, 5, 21,
'These 6 questions ask how the patient is compared to when s/he was well, say 5-10 years ago.<br>Compared to a few years ago:', 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^Scale\n(Yes, No, Don''t know or N/A)^Score\n(Add all No, Don''t know, N/A answers)', 1, 1, 23, 23, 6, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Does the patient have more trouble remembering things that have happened recently than s/he used to?', 1, 1, 23, 23, 7, 24)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Does he or she have more trouble recalling conversations a few days later?', 1, 1, 23, 23, 8, 24)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('When speaking, does the patient have more difficulty in finding the right word or tend to use the wrong words more often?', 1, 1, 23, 23, 9, 24)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Is the patient less able to manage money and financial affairs (e.g. paying bills, budgeting)? ', 1, 1, 23, 23, 10, 24)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Is the patient less able to manage his or her medication independently?', 1, 1, 23, 23, 11, 24)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Does the patient need more assistance with transport (either private or public)?(If the patient has difficulties due only to physical problems, e.g bad leg, answer is ‘NO’)', 1, 1, 23, 23, 12, 24)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType],[QuestionHTML], [IsHTML]) 
values ('Total score (out of 6). To get a total score, add the number of items answered ''no'', ''don''t know'' or ''N/A''', 1, 1, 23, 23, 13, 25,
'Total score (out of 6)<br>To get a total score, add the number of items answered ''no'', ''don''t know'' or ''N/A''',1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('If patient scores 0-3, cognitive impairment is indicated. Conduct standard investigations', 1, 1, 23, 23, 14, 20)

/***************** SECTION CONTINENCE (24) ***********/
insert tblSection (SectionName, SectionType) values ('Continence', 3)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Continence', 1, 1, 24, 24, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^Comments', 1, 1, 24, 24, 2, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Have you had any problems with your bladder or bowel (wee or Poo)', 1, 1, 24, 24, 3, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Do you ever wet yourself? If yes, is this related to coughing and sneezing?', 1, 1, 24, 24, 4, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Do you have any trouble passing urine? If yes please describe:', 1, 1, 24, 24, 5, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Do you ever lose control of your bowels?', 1, 1, 24, 24, 6, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Have you had a recent change of habit or blood in your stool?', 1, 1, 24, 24, 7, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('How often do you go to the toilet at night?', 1, 1, 24, 24, 8, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('REFERRALS or ACTIONS REQUIRED', 1, 1, 24, 24, 9, 4)

/***************** SECTION PERSONAL WELLBEING ASSESSMENT & SAFETY (25) ***********/
insert tblSection (SectionName, SectionType) values ('Personal Wellbeing Assessment & Safety', 3)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Personal Wellbeing Assessment & Safety', 1, 1, 25, 25, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^Comments', 1, 1, 25, 25, 2, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Have you been feeling down or out of sorts lately, or not wanting to get out of bed', 1, 1, 25, 25, 3, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Geriatric Depression Score:', 1, 1, 25, 25, 4, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Do you have difficulty sleeping? If yes, please describe:', 1, 1, 25, 25, 5, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('If patient lives alone ask the following:', 1, 1, 25, 25, 6, 20)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Has a friend or family member made you feel afraid?', 1, 1, 25, 25, 7, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Has a friend or family member hurt you physically?', 1, 1, 25, 25, 8, 12)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('REFERRALS or ACTIONS REQUIRED', 1, 1, 25, 25, 9, 4)


/****************** Still to insert into database *********************/
/***************** SECTION FRAILTY SCREEN (26) ***********/
insert tblSection (SectionName, SectionType) values ('Frailty Screen', 9)
insert tblSectionType (SectionType) values ('A 4 column with question, question details, scale and score')

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Frailty Screen', 1, 1, 26, 26, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^^Scale (Yes/No)^Score (1 point for Yes)', 1, 1, 26, 267, 2, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType], [QuestionDetails]) 
values ('Fatigue', 1, 1, 26, 26, 3, 5, 'Do you feel tired when you sit still?')

/***************** SECTION MOBILITY / ACTIVITY (27) ***********/
insert tblSection (SectionName, SectionType) values ('Mobility / Activity', 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Mobility / Activity', 1, 1, 27, 27, 1, 1)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('^Comments', 1, 1, 27, 27, 2, 2)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Do you use a walking aid, such as a walking stick, frame, wheelchair or motorised scooter?', 1, 1, 27, 27, 3, 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('What do you do for exercise?', 1, 1, 27, 27, 4, 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Can you carry objects (e.g.: meals easily and safely from the kitchen to your dining area)?', 1, 1, 27, 27, 5, 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('Do you have any trouble doing things around the house garden or neighbourhood?', 1, 1, 27, 27, 6, 5)

insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
values ('o you have difficulty gripping utensils or handrails?', 1, 1, 27, 27, 7, 5)



select * from [dbo].[tblSection]
select * from tblSectionType

--insert tblQuestions ([Question], [Active], [FormTypeId], [SectionId], [SectionSortOrder], [QuestionInSectionSortOrder], [QuestionType]) 
--values ('Comments', 1, 1, 1, 1, 5, 4)

--update tblSection set SectionType = 3 where ID = 24

--update tblQuestions set QUestion = 'Total score (out of 6). To get a total score, add the number of items answered ''no'', ''don''t know'' or ''N/A''',
--QuestionHTML = 'Total score (out of 6)<br>To get a total score, add the number of items answered ''no'', ''don''t know'' or ''N/A''', IsHTML = 1
--where ID = 179

--update tblQuestions set QuestionType = 4 where ID = 78
--update tblQuestions set QuestionType = 12 where ID in (183,184,185,186,187,188)
--update tblQuestions set QUestion = 'Patient Consent' where ID = 1
--update tblQuestions set QUestionInSectionSortOrder = 4 where ID = 151
--update tblQuestions set QuestionDetails = '0= severe decrease in food intake\n1= moderate in food intake\n2= no decrease in food intake' where ID = 120
--update tblQuestions set QuestionInSectionSortOrder = QuestionInSectionSortOrder + 1 where ID in (118, 119, 120)
--update tblQuestions set ISHTML = 1, QuestionHTML = 'Perform GPCOG Screening Test <a href="http://gpcog.com.au/" target="_blank">http://gpcog.com.au/</a> template <a href="https://www.alz.org/documents_custom/gpcog(english).pdf" target="_blank">https://www.alz.org/documents_custom/gpcog(english).pdf</a>' where ID = 149
--update tblQuestions set QuestionHTML = '6. What was the name and address I asked you to remember<ul><li>John</li><li>Brown</li><li>42</li><li>West St</li><li>Kensington</li></ul>' where Id = 161