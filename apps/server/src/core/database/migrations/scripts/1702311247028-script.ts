import { MigrationInterface, QueryRunner } from 'typeorm'

export class Script1702311247028 implements MigrationInterface {
  name = 'Script1702311247028'

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        `
        INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('07a00e0b-76f2-4a7f-b851-fbbd1a8b0969', '1Willow45@gmail.com', 'Emily Jones', 'https://i.imgur.com/YfJQV5z.png?id=3', 'cus_3m1lyj0n3s012', 'banned', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('681c2407-9662-4e26-9c3b-12c8d6e55a59', '8Lexi.Conn73@yahoo.com', 'Emily Jones', 'https://i.imgur.com/YfJQV5z.png?id=10', 'cus_M1ch43lb789', 'inactive', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('fc999a3c-e6fb-4a82-81e1-a54c162b8cc6', '15Cleta.Romaguera@hotmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=17', 'cus_J4ne5m1th456', 'inactive', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('6f4ecbc6-6474-462a-be9e-eac591ef8420', '22Marlee.Parker@hotmail.com', 'Emily Jones', 'https://i.imgur.com/YfJQV5z.png?id=24', 'cus_M1ch43lb789', 'inactive', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('0075128e-2670-40c1-8a69-97810fcfe4c3', '36Edwina.Kuhic35@gmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=38', 'cus_J0hnd0e123', 'active', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('627cde72-f553-4fff-9e12-fec446a37bca', '43Rosendo_Dietrich@hotmail.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=45', 'cus_J4ne5m1th456', 'banned', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('8d326da4-4197-4b2e-8b1c-d74d3f1f5a78', '50Hanna55@yahoo.com', 'Emily Jones', 'https://i.imgur.com/YfJQV5z.png?id=52', 'cus_J4ne5m1th456', 'active', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('781d2aa6-9f7e-44cf-8aa5-da1ccb6a0d6a', '57Eleonore.Champlin@gmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=59', 'cus_D4v1dw1ls0n345', 'active', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('1e6e3628-9305-45ed-ba26-9e3b458a904d', '64Chloe_Bergstrom@gmail.com', 'David Wilson', 'https://i.imgur.com/YfJQV5z.png?id=66', 'cus_J4ne5m1th456', 'active', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('04fc87ac-0e9d-42e0-b868-0d25e92b7bb9', 'Donation Received', 'You have received a new donation. Thank you for your support', 'Alex Johnson', '74Breanna29@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=75', 'https://i.imgur.com/YfJQV5z.png?id=76', '681c2407-9662-4e26-9c3b-12c8d6e55a59');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('8fea90ab-1490-4e38-9f05-1f6525a6d9c2', 'Chat Message', 'The game youre following has just started the second half.', 'Emily Davis', '81Efrain.Ullrich30@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=82', 'https://i.imgur.com/YfJQV5z.png?id=83', '627cde72-f553-4fff-9e12-fec446a37bca');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('0894af37-79b8-4c6a-82fe-72843b83b526', 'New Streamer Alert', 'You have received a new donation. Thank you for your support', 'SportsApp Team', '88Kayleigh_Gusikowski@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=89', 'https://i.imgur.com/YfJQV5z.png?id=90', '0075128e-2670-40c1-8a69-97810fcfe4c3');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('2e02aa0b-28c6-402f-97d7-9568a7fcf2d6', 'Chat Message', 'You have received a new donation. Thank you for your support', 'Emily Davis', '95Mathias_Bins@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=96', 'https://i.imgur.com/YfJQV5z.png?id=97', '07a00e0b-76f2-4a7f-b851-fbbd1a8b0969');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('d15b5ef7-323f-4a64-89a0-689a6cd5ee84', 'New Streamer Alert', 'You have a new message in the chat.', 'John Doe', '102Jayden_Keeling85@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=103', 'https://i.imgur.com/YfJQV5z.png?id=104', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('83961eb2-1f99-4f65-891e-9f8981144253', 'Chat Message', 'You have received a new donation. Thank you for your support', 'Alex Johnson', '109Wyatt.Schinner-Zieme37@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=110', 'https://i.imgur.com/YfJQV5z.png?id=111', '627cde72-f553-4fff-9e12-fec446a37bca');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('127607c9-901a-4679-a83a-fe54cf2a4022', 'Chat Message', 'A new streamer has joined the platform. Check them out', 'John Doe', '116Juwan94@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=117', 'https://i.imgur.com/YfJQV5z.png?id=118', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('80c1b352-0941-4b3d-9994-5c99e7b7ee7e', 'New Streamer Alert', 'You have a new message in the chat.', 'Emily Davis', '123Keshaun.Hayes99@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=124', 'https://i.imgur.com/YfJQV5z.png?id=125', '627cde72-f553-4fff-9e12-fec446a37bca');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('a5ad900f-a094-4d1a-b7bf-e8b187ee14de', 'Subscription Renewal', 'You have received a new donation. Thank you for your support', 'Jane Smith', '130Bud.Heidenreich@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=131', 'https://i.imgur.com/YfJQV5z.png?id=132', '781d2aa6-9f7e-44cf-8aa5-da1ccb6a0d6a');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('8864f6cf-bd88-418e-9611-2a6b10584970', 'New Streamer Alert', 'Your subscription has been successfully renewed.', 'SportsApp Team', '137Mason.Nader86@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=138', 'https://i.imgur.com/YfJQV5z.png?id=139', '1e6e3628-9305-45ed-ba26-9e3b458a904d');

INSERT INTO "sporting_event" ("id", "name", "startTime", "endTime", "description") VALUES ('6833a589-d698-40a1-9bde-ed047df7c044', 'Super Bowl LVII', '2023-10-19T12:27:42.981Z', '2025-02-28T11:23:59.684Z', 'A showcase of the best talent in the NBA featuring exciting skills competitions and an allstar game.');
INSERT INTO "sporting_event" ("id", "name", "startTime", "endTime", "description") VALUES ('e835b51f-6242-497c-9f42-3ba77c401921', 'Wimbledon Mens Final', '2023-12-25T13:47:50.197Z', '2024-09-24T12:43:47.854Z', 'A grueling mountain stage in the worlds most famous cycling race testing the endurance of the riders.');
INSERT INTO "sporting_event" ("id", "name", "startTime", "endTime", "description") VALUES ('afa47ae4-3a2b-400b-a628-650fe51c25cd', 'Tour de France Stage 12', '2023-12-28T06:50:58.155Z', '2023-12-11T20:29:17.655Z', 'The final match of the prestigious tennis tournament held at the All England Club.');
INSERT INTO "sporting_event" ("id", "name", "startTime", "endTime", "description") VALUES ('2c5eb0b9-5882-47b9-a29c-807586cd8fea', 'Champions League Final', '2024-08-05T09:38:12.370Z', '2023-07-21T08:43:43.093Z', 'The biggest event in American football where the champions of the AFC and NFC face off.');
INSERT INTO "sporting_event" ("id", "name", "startTime", "endTime", "description") VALUES ('c7941ead-f6c6-435a-8055-964c966f305a', 'NBA AllStar Game', '2025-01-28T18:48:39.948Z', '2023-12-10T16:29:22.956Z', 'The pinnacle of European club football featuring the top two teams in a battle for glory.');
INSERT INTO "sporting_event" ("id", "name", "startTime", "endTime", "description") VALUES ('d3971457-7dde-48db-a2fa-4dc479ea3d6c', 'Tour de France Stage 12', '2025-03-23T21:58:47.644Z', '2023-08-09T07:25:00.410Z', 'A grueling mountain stage in the worlds most famous cycling race testing the endurance of the riders.');
INSERT INTO "sporting_event" ("id", "name", "startTime", "endTime", "description") VALUES ('afa71423-a977-40b6-80f7-239bd1b1bd16', 'Tour de France Stage 12', '2024-12-24T00:45:07.546Z', '2023-06-30T04:45:55.860Z', 'The pinnacle of European club football featuring the top two teams in a battle for glory.');
INSERT INTO "sporting_event" ("id", "name", "startTime", "endTime", "description") VALUES ('613437cf-b8c8-4097-aaab-1c5a1f25cca5', 'Wimbledon Mens Final', '2024-07-31T11:50:17.068Z', '2023-08-03T08:07:54.093Z', 'A grueling mountain stage in the worlds most famous cycling race testing the endurance of the riders.');
INSERT INTO "sporting_event" ("id", "name", "startTime", "endTime", "description") VALUES ('12fdf2c5-168d-4f56-a904-08afec0e7ca5', 'Wimbledon Mens Final', '2024-08-28T15:51:57.415Z', '2023-07-10T10:45:18.756Z', 'The final match of the prestigious tennis tournament held at the All England Club.');
INSERT INTO "sporting_event" ("id", "name", "startTime", "endTime", "description") VALUES ('1bc0366d-4ade-46e5-96d8-97e85c07dfb0', 'NBA AllStar Game', '2023-08-24T06:31:20.548Z', '2024-12-23T21:16:45.582Z', 'A showcase of the best talent in the NBA featuring exciting skills competitions and an allstar game.');

INSERT INTO "stream" ("id", "startTime", "endTime", "gameTimeRemaining", "status", "streamerId", "sportingEventId") VALUES ('f1450ce4-33e5-4e44-8437-72b8b9f2e33c', '2024-12-27T18:54:14.960Z', '2023-07-23T05:44:21.729Z', '0745', 'ended', '781d2aa6-9f7e-44cf-8aa5-da1ccb6a0d6a', '613437cf-b8c8-4097-aaab-1c5a1f25cca5');
INSERT INTO "stream" ("id", "startTime", "endTime", "gameTimeRemaining", "status", "streamerId", "sportingEventId") VALUES ('77aad864-6a3c-44ad-8e73-86d427dd3387', '2023-08-11T05:40:48.076Z', '2024-03-26T07:42:25.079Z', '2310', 'interrupted', '07a00e0b-76f2-4a7f-b851-fbbd1a8b0969', '1bc0366d-4ade-46e5-96d8-97e85c07dfb0');
INSERT INTO "stream" ("id", "startTime", "endTime", "gameTimeRemaining", "status", "streamerId", "sportingEventId") VALUES ('8a9dc2f6-245e-4448-bfb2-3f722be9f7a4', '2025-05-25T05:49:31.629Z', '2024-09-18T11:33:22.837Z', '1215', 'scheduled', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '12fdf2c5-168d-4f56-a904-08afec0e7ca5');
INSERT INTO "stream" ("id", "startTime", "endTime", "gameTimeRemaining", "status", "streamerId", "sportingEventId") VALUES ('c39ca996-fcd8-4ec1-bd8d-ec3b7798d28d', '2024-12-15T07:28:20.660Z', '2024-08-24T23:46:31.980Z', '0745', 'paused', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '613437cf-b8c8-4097-aaab-1c5a1f25cca5');
INSERT INTO "stream" ("id", "startTime", "endTime", "gameTimeRemaining", "status", "streamerId", "sportingEventId") VALUES ('44829b81-bd48-4771-88bb-9ea6ba2f3f2d', '2024-10-09T02:42:16.687Z', '2025-06-05T19:26:59.357Z', '0500', 'live', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '6833a589-d698-40a1-9bde-ed047df7c044');
INSERT INTO "stream" ("id", "startTime", "endTime", "gameTimeRemaining", "status", "streamerId", "sportingEventId") VALUES ('0edd47d3-adc8-4e52-a72f-cdce7f42d702', '2023-10-15T11:45:53.129Z', '2025-02-27T00:15:36.248Z', '1530', 'interrupted', '681c2407-9662-4e26-9c3b-12c8d6e55a59', '613437cf-b8c8-4097-aaab-1c5a1f25cca5');
INSERT INTO "stream" ("id", "startTime", "endTime", "gameTimeRemaining", "status", "streamerId", "sportingEventId") VALUES ('17893646-0b5c-4676-b7b4-f3ccd6c75fa8', '2025-04-08T01:44:02.167Z', '2024-03-16T20:49:57.329Z', '1215', 'ended', '6f4ecbc6-6474-462a-be9e-eac591ef8420', 'afa47ae4-3a2b-400b-a628-650fe51c25cd');
INSERT INTO "stream" ("id", "startTime", "endTime", "gameTimeRemaining", "status", "streamerId", "sportingEventId") VALUES ('8eef3a73-40c2-4fe7-a7e7-f3736f35b6f1', '2023-08-24T07:51:06.935Z', '2023-12-18T13:14:57.461Z', '2310', 'scheduled', '8d326da4-4197-4b2e-8b1c-d74d3f1f5a78', 'c7941ead-f6c6-435a-8055-964c966f305a');
INSERT INTO "stream" ("id", "startTime", "endTime", "gameTimeRemaining", "status", "streamerId", "sportingEventId") VALUES ('4cd9ce83-a1ca-4f0e-b1ec-36179c936fd6', '2024-08-16T21:16:33.069Z', '2024-12-14T07:56:36.890Z', '0500', 'live', '6f4ecbc6-6474-462a-be9e-eac591ef8420', '2c5eb0b9-5882-47b9-a29c-807586cd8fea');
INSERT INTO "stream" ("id", "startTime", "endTime", "gameTimeRemaining", "status", "streamerId", "sportingEventId") VALUES ('9ac28ef0-2ab2-44af-ade9-b2dbd853db58', '2025-05-13T02:02:20.839Z', '2025-01-04T07:38:18.728Z', '1530', 'live', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '12fdf2c5-168d-4f56-a904-08afec0e7ca5');

INSERT INTO "subscription" ("id", "startDate", "endDate", "userId", "streamerId") VALUES ('b36d54e4-bef6-4ee1-8bbb-3b09a4a8a07f', '2023-12-08T23:04:59.265Z', '2024-06-10T03:18:13.370Z', '0075128e-2670-40c1-8a69-97810fcfe4c3', '0075128e-2670-40c1-8a69-97810fcfe4c3');
INSERT INTO "subscription" ("id", "startDate", "endDate", "userId", "streamerId") VALUES ('14a3894b-7ca2-43d7-b885-9380b3e969c5', '2023-09-15T16:01:08.219Z', '2023-10-22T18:05:06.935Z', '07a00e0b-76f2-4a7f-b851-fbbd1a8b0969', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "subscription" ("id", "startDate", "endDate", "userId", "streamerId") VALUES ('2a54d497-0bca-45c2-9bae-f59cf826cbbc', '2025-04-28T09:35:21.152Z', '2025-02-22T17:45:50.402Z', '0075128e-2670-40c1-8a69-97810fcfe4c3', '0075128e-2670-40c1-8a69-97810fcfe4c3');
INSERT INTO "subscription" ("id", "startDate", "endDate", "userId", "streamerId") VALUES ('f2965eb2-b43e-4441-ad28-bf361d977694', '2023-07-20T14:57:48.290Z', '2023-09-17T15:23:06.336Z', '8d326da4-4197-4b2e-8b1c-d74d3f1f5a78', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "subscription" ("id", "startDate", "endDate", "userId", "streamerId") VALUES ('734436a4-75f2-4851-90ae-a0710314fa76', '2025-04-12T22:51:02.254Z', '2024-05-16T20:46:29.792Z', '681c2407-9662-4e26-9c3b-12c8d6e55a59', 'fc999a3c-e6fb-4a82-81e1-a54c162b8cc6');
INSERT INTO "subscription" ("id", "startDate", "endDate", "userId", "streamerId") VALUES ('a630a3c3-892f-44d7-84c6-5c6d99255cb0', '2025-02-07T18:01:35.706Z', '2024-01-12T11:43:11.827Z', '0075128e-2670-40c1-8a69-97810fcfe4c3', '1e6e3628-9305-45ed-ba26-9e3b458a904d');
INSERT INTO "subscription" ("id", "startDate", "endDate", "userId", "streamerId") VALUES ('b8cf9064-7f6a-4f38-95de-159158fbd4ed', '2024-09-22T01:35:11.214Z', '2023-11-24T11:37:25.880Z', '6f4ecbc6-6474-462a-be9e-eac591ef8420', '781d2aa6-9f7e-44cf-8aa5-da1ccb6a0d6a');
INSERT INTO "subscription" ("id", "startDate", "endDate", "userId", "streamerId") VALUES ('f2ac2e43-34b0-4d91-8b81-4ef37b31e255', '2024-02-25T23:37:31.933Z', '2023-06-16T16:28:22.051Z', '781d2aa6-9f7e-44cf-8aa5-da1ccb6a0d6a', '781d2aa6-9f7e-44cf-8aa5-da1ccb6a0d6a');
INSERT INTO "subscription" ("id", "startDate", "endDate", "userId", "streamerId") VALUES ('2f62bca3-a76e-4adc-9adf-c87932d0fe90', '2024-09-04T16:25:55.695Z', '2025-05-15T12:07:55.366Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '781d2aa6-9f7e-44cf-8aa5-da1ccb6a0d6a');
INSERT INTO "subscription" ("id", "startDate", "endDate", "userId", "streamerId") VALUES ('eec04001-5899-48e3-b325-cc2302fb1249', '2023-08-03T04:40:04.952Z', '2023-06-10T10:32:29.499Z', '0075128e-2670-40c1-8a69-97810fcfe4c3', '1e6e3628-9305-45ed-ba26-9e3b458a904d');

INSERT INTO "donation" ("id", "amount", "donationTime", "userId", "streamerId") VALUES ('2f611d2f-56a1-47eb-8912-715e3ae93d01', 163, '2024-12-16T20:14:12.087Z', 'fc999a3c-e6fb-4a82-81e1-a54c162b8cc6', '8d326da4-4197-4b2e-8b1c-d74d3f1f5a78');
INSERT INTO "donation" ("id", "amount", "donationTime", "userId", "streamerId") VALUES ('a18e4cea-291d-4ce7-acb3-8ba3ee840e53', 726, '2024-01-13T14:20:17.898Z', 'fc999a3c-e6fb-4a82-81e1-a54c162b8cc6', '8d326da4-4197-4b2e-8b1c-d74d3f1f5a78');
INSERT INTO "donation" ("id", "amount", "donationTime", "userId", "streamerId") VALUES ('4c4792f7-e139-4eed-a7d7-c4703cf9c86e', 395, '2023-12-21T13:01:32.740Z', '6f4ecbc6-6474-462a-be9e-eac591ef8420', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "donation" ("id", "amount", "donationTime", "userId", "streamerId") VALUES ('e108b3b0-8258-400c-b73c-989c0268d989', 940, '2023-10-01T13:56:38.918Z', '1e6e3628-9305-45ed-ba26-9e3b458a904d', '627cde72-f553-4fff-9e12-fec446a37bca');
INSERT INTO "donation" ("id", "amount", "donationTime", "userId", "streamerId") VALUES ('bbacd48d-fbfa-4291-bd25-3d4ae7b0bc01', 243, '2023-07-24T11:01:56.730Z', '781d2aa6-9f7e-44cf-8aa5-da1ccb6a0d6a', '1e6e3628-9305-45ed-ba26-9e3b458a904d');
INSERT INTO "donation" ("id", "amount", "donationTime", "userId", "streamerId") VALUES ('75c2f65b-4fe1-4061-b7b9-bab393af6e43', 449, '2024-01-14T13:20:58.939Z', '681c2407-9662-4e26-9c3b-12c8d6e55a59', '1e6e3628-9305-45ed-ba26-9e3b458a904d');
INSERT INTO "donation" ("id", "amount", "donationTime", "userId", "streamerId") VALUES ('efc8d379-8958-44ce-8ac0-f4175961ae57', 925, '2024-04-14T09:24:33.699Z', '0075128e-2670-40c1-8a69-97810fcfe4c3', '781d2aa6-9f7e-44cf-8aa5-da1ccb6a0d6a');
INSERT INTO "donation" ("id", "amount", "donationTime", "userId", "streamerId") VALUES ('b48f22ce-ea8c-49fa-b5fc-510a25c9ec4c', 987, '2025-02-20T18:06:15.209Z', '1e6e3628-9305-45ed-ba26-9e3b458a904d', '781d2aa6-9f7e-44cf-8aa5-da1ccb6a0d6a');
INSERT INTO "donation" ("id", "amount", "donationTime", "userId", "streamerId") VALUES ('916f8ebe-71e6-499f-adb9-741c2b78ef67', 861, '2023-07-31T06:25:11.445Z', '07a00e0b-76f2-4a7f-b851-fbbd1a8b0969', 'fc999a3c-e6fb-4a82-81e1-a54c162b8cc6');
INSERT INTO "donation" ("id", "amount", "donationTime", "userId", "streamerId") VALUES ('181e7dcf-922b-4dd0-9958-3c0fcbc434a1', 75, '2025-01-22T03:01:55.761Z', 'fc999a3c-e6fb-4a82-81e1-a54c162b8cc6', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "comment" ("id", "content", "commentTime", "streamId", "userId") VALUES ('b2feecab-9587-4e68-b924-234f64fc8505', 'What a thrilling game', '2024-10-21T23:41:17.341Z', 'f1450ce4-33e5-4e44-8437-72b8b9f2e33c', '781d2aa6-9f7e-44cf-8aa5-da1ccb6a0d6a');
INSERT INTO "comment" ("id", "content", "commentTime", "streamId", "userId") VALUES ('c0dc4ed6-2f30-4bc4-bcff-b3f56c636ad1', 'I cant believe that just happened', '2023-08-26T07:30:04.831Z', 'c39ca996-fcd8-4ec1-bd8d-ec3b7798d28d', '0075128e-2670-40c1-8a69-97810fcfe4c3');
INSERT INTO "comment" ("id", "content", "commentTime", "streamId", "userId") VALUES ('bf7484d3-4534-472c-912d-6fcc7b231181', 'This commentator is on point.', '2025-05-23T23:02:29.246Z', '8eef3a73-40c2-4fe7-a7e7-f3736f35b6f1', '6f4ecbc6-6474-462a-be9e-eac591ef8420');
INSERT INTO "comment" ("id", "content", "commentTime", "streamId", "userId") VALUES ('48c9a6d6-6953-4af9-b378-1b90d1a8cd97', 'What a thrilling game', '2023-12-04T05:35:37.121Z', '17893646-0b5c-4676-b7b4-f3ccd6c75fa8', '0075128e-2670-40c1-8a69-97810fcfe4c3');
INSERT INTO "comment" ("id", "content", "commentTime", "streamId", "userId") VALUES ('4a6c2132-28ca-4274-9949-3a5ae5408409', 'What a thrilling game', '2023-12-18T18:59:01.475Z', '8eef3a73-40c2-4fe7-a7e7-f3736f35b6f1', '07a00e0b-76f2-4a7f-b851-fbbd1a8b0969');
INSERT INTO "comment" ("id", "content", "commentTime", "streamId", "userId") VALUES ('a0982983-55ea-47bb-bfee-0fc832f22262', 'Great play by the team', '2025-03-06T14:35:38.087Z', '8a9dc2f6-245e-4448-bfb2-3f722be9f7a4', '1e6e3628-9305-45ed-ba26-9e3b458a904d');
INSERT INTO "comment" ("id", "content", "commentTime", "streamId", "userId") VALUES ('19435b06-8488-476f-af8e-dc6a4257ce5c', 'What a thrilling game', '2025-03-26T02:03:08.032Z', '0edd47d3-adc8-4e52-a72f-cdce7f42d702', '781d2aa6-9f7e-44cf-8aa5-da1ccb6a0d6a');
INSERT INTO "comment" ("id", "content", "commentTime", "streamId", "userId") VALUES ('55b9acfa-897f-4623-8a9d-797691b07f48', 'This commentator is on point.', '2024-04-09T18:22:58.474Z', 'c39ca996-fcd8-4ec1-bd8d-ec3b7798d28d', '0075128e-2670-40c1-8a69-97810fcfe4c3');
INSERT INTO "comment" ("id", "content", "commentTime", "streamId", "userId") VALUES ('f060fe6e-635d-4be5-92f2-1b8761e272b5', 'This commentator is on point.', '2024-08-09T12:06:32.021Z', '0edd47d3-adc8-4e52-a72f-cdce7f42d702', '781d2aa6-9f7e-44cf-8aa5-da1ccb6a0d6a');
INSERT INTO "comment" ("id", "content", "commentTime", "streamId", "userId") VALUES ('c00fb091-7bf2-44ff-8574-03d331c2f7d9', 'This commentator is on point.', '2024-05-13T16:26:34.071Z', '8a9dc2f6-245e-4448-bfb2-3f722be9f7a4', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "clip" ("id", "url", "creationTime", "streamId") VALUES ('f5ec271f-3fc5-489f-ab21-0ae57e67bf08', 'https://i.imgur.com/YfJQV5z.png?id=331', '2024-09-16T18:31:44.523Z', '17893646-0b5c-4676-b7b4-f3ccd6c75fa8');
INSERT INTO "clip" ("id", "url", "creationTime", "streamId") VALUES ('7cb3736d-cc52-48e4-ae95-450b41368280', 'https://i.imgur.com/YfJQV5z.png?id=334', '2024-10-13T23:55:34.933Z', 'f1450ce4-33e5-4e44-8437-72b8b9f2e33c');
INSERT INTO "clip" ("id", "url", "creationTime", "streamId") VALUES ('12d0b1c8-5ec1-40d6-afdc-cdad67b5ef24', 'https://i.imgur.com/YfJQV5z.png?id=337', '2023-06-17T15:46:43.856Z', '8a9dc2f6-245e-4448-bfb2-3f722be9f7a4');
INSERT INTO "clip" ("id", "url", "creationTime", "streamId") VALUES ('ca0587c9-eaea-47da-9d75-6591fd60277f', 'https://i.imgur.com/YfJQV5z.png?id=340', '2024-04-28T01:42:33.194Z', '77aad864-6a3c-44ad-8e73-86d427dd3387');
INSERT INTO "clip" ("id", "url", "creationTime", "streamId") VALUES ('469f5125-b799-449e-9abf-6f147cc1fd17', 'https://i.imgur.com/YfJQV5z.png?id=343', '2024-04-14T00:15:50.248Z', '9ac28ef0-2ab2-44af-ade9-b2dbd853db58');
INSERT INTO "clip" ("id", "url", "creationTime", "streamId") VALUES ('aaa33162-bba3-4ac1-9844-07fffaf5476f', 'https://i.imgur.com/YfJQV5z.png?id=346', '2025-03-11T02:42:49.025Z', '77aad864-6a3c-44ad-8e73-86d427dd3387');
INSERT INTO "clip" ("id", "url", "creationTime", "streamId") VALUES ('17df850c-bba4-44fe-b3f0-90032410fd50', 'https://i.imgur.com/YfJQV5z.png?id=349', '2024-01-08T05:54:07.910Z', '8a9dc2f6-245e-4448-bfb2-3f722be9f7a4');
INSERT INTO "clip" ("id", "url", "creationTime", "streamId") VALUES ('2fe30273-4a34-4ae1-a2a4-92e4bc342f39', 'https://i.imgur.com/YfJQV5z.png?id=352', '2025-03-19T10:53:42.217Z', '44829b81-bd48-4771-88bb-9ea6ba2f3f2d');
INSERT INTO "clip" ("id", "url", "creationTime", "streamId") VALUES ('c6d34ec2-d542-4e56-8d18-2ae8ab24b34c', 'https://i.imgur.com/YfJQV5z.png?id=355', '2025-03-30T16:39:12.485Z', '4cd9ce83-a1ca-4f0e-b1ec-36179c936fd6');
INSERT INTO "clip" ("id", "url", "creationTime", "streamId") VALUES ('2b0bfc11-4ebf-488e-8b30-abe05220d9b8', 'https://i.imgur.com/YfJQV5z.png?id=358', '2023-09-25T14:34:00.204Z', '17893646-0b5c-4676-b7b4-f3ccd6c75fa8');

INSERT INTO "earning" ("id", "amount", "earningTime", "streamerId") VALUES ('72febbde-cf63-4df9-b6b1-84f35ca9ea2d', 87, '2024-11-25T06:31:36.937Z', '07a00e0b-76f2-4a7f-b851-fbbd1a8b0969');
INSERT INTO "earning" ("id", "amount", "earningTime", "streamerId") VALUES ('bcb54de3-2de5-48f5-b8d0-70d868b1c68a', 871, '2024-10-25T13:55:36.375Z', '1e6e3628-9305-45ed-ba26-9e3b458a904d');
INSERT INTO "earning" ("id", "amount", "earningTime", "streamerId") VALUES ('f797a8d2-1af5-487b-89a9-6485c1bf19df', 302, '2024-10-18T00:07:36.964Z', 'fc999a3c-e6fb-4a82-81e1-a54c162b8cc6');
INSERT INTO "earning" ("id", "amount", "earningTime", "streamerId") VALUES ('a0f90cf9-701b-4a95-bc54-5c98b25e9b65', 491, '2024-03-15T11:35:46.752Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "earning" ("id", "amount", "earningTime", "streamerId") VALUES ('2acf4745-825d-4390-885a-a1e09b144d5a', 120, '2024-09-16T22:39:51.626Z', '8d326da4-4197-4b2e-8b1c-d74d3f1f5a78');
INSERT INTO "earning" ("id", "amount", "earningTime", "streamerId") VALUES ('4bba8bf0-e96b-4e33-9d2d-e73f4636a60e', 212, '2024-02-24T19:39:48.287Z', '8d326da4-4197-4b2e-8b1c-d74d3f1f5a78');
INSERT INTO "earning" ("id", "amount", "earningTime", "streamerId") VALUES ('e8a56b66-866e-4399-904e-b5e6c884516b', 346, '2023-08-19T22:52:17.636Z', '0075128e-2670-40c1-8a69-97810fcfe4c3');
INSERT INTO "earning" ("id", "amount", "earningTime", "streamerId") VALUES ('c5e742a2-22f4-4508-9bcb-e809f4cf42fd', 483, '2025-05-15T12:18:54.627Z', '0075128e-2670-40c1-8a69-97810fcfe4c3');
INSERT INTO "earning" ("id", "amount", "earningTime", "streamerId") VALUES ('dfceac53-4a48-4ee1-860a-3d5f83dafeb5', 18, '2024-10-28T00:58:36.393Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "earning" ("id", "amount", "earningTime", "streamerId") VALUES ('ced05b83-4b26-4b0a-beac-5d55bf48b598', 2, '2023-07-07T08:41:35.879Z', '07a00e0b-76f2-4a7f-b851-fbbd1a8b0969');
    `,
      )
    } catch (error) {
      // ignore
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
