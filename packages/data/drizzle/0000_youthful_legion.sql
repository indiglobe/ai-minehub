CREATE TABLE `mining_order` (
	`id` char(10) NOT NULL,
	`ordered_by` char(10) NOT NULL,
	`amount_invested` int NOT NULL,
	`amount_received` int DEFAULT 0,
	`mining_profile_used` char(10) NOT NULL,
	`investment_status` enum('ACTIVE','COMPLETED'),
	`created_at` timestamp(6) NOT NULL,
	`updated_at` timestamp(6) NOT NULL,
	`table_identifier_token` enum('USER','TWAL','MWAL','RTNG','MORD','NEWS','MPRO','TORD','TWDP','TWWD','MWDP','MWWD') NOT NULL DEFAULT 'MORD',
	CONSTRAINT `mining_order_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mining_profile` (
	`id` char(10) NOT NULL,
	`maximum_allowed_amount` int NOT NULL,
	`minimum_allowed_amount` int NOT NULL,
	`lockin_period` smallint NOT NULL,
	`category` varchar(50) NOT NULL,
	`daily_return` float(2) NOT NULL,
	`is_popular` boolean NOT NULL,
	`created_at` timestamp(6) NOT NULL,
	`updated_at` timestamp(6) NOT NULL,
	`table_identifier_token` enum('USER','TWAL','MWAL','RTNG','MORD','NEWS','MPRO','TORD','TWDP','TWWD','MWDP','MWWD') NOT NULL DEFAULT 'MPRO',
	CONSTRAINT `mining_profile_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mining_wallet` (
	`id` char(10) NOT NULL,
	`balance` float(2),
	`associated_user` char(10) NOT NULL,
	`created_at` timestamp(6) NOT NULL,
	`updated_at` timestamp(6) NOT NULL,
	`table_identifier_token` enum('USER','TWAL','MWAL','RTNG','MORD','NEWS','MPRO','TORD','TWDP','TWWD','MWDP','MWWD') NOT NULL DEFAULT 'MWAL',
	CONSTRAINT `mining_wallet_id` PRIMARY KEY(`id`),
	CONSTRAINT `mining_wallet_associated_user_unique` UNIQUE(`associated_user`)
);
--> statement-breakpoint
CREATE TABLE `mining_wallet_deposits` (
	`id` char(10) NOT NULL,
	`ordered_by` char(10) NOT NULL,
	`wallet` char(10) NOT NULL,
	`amount` int NOT NULL,
	`deposit_status` enum('PENDING','PROCESSED','VALIDATING','REJECTED'),
	`deposit_method` enum('BSC','TRX','ETH','Bitcoin') NOT NULL,
	`transaction_id` varchar(127) NOT NULL,
	`deposit_proof` varchar(255) NOT NULL,
	`created_at` timestamp(6) NOT NULL,
	`updated_at` timestamp(6) NOT NULL,
	`table_identifier_token` enum('USER','TWAL','MWAL','RTNG','MORD','NEWS','MPRO','TORD','TWDP','TWWD','MWDP','MWWD') NOT NULL DEFAULT 'MWDP',
	CONSTRAINT `mining_wallet_deposits_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mining_wallet_withdraw` (
	`id` char(10) NOT NULL,
	`ordered_by` char(10) NOT NULL,
	`wallet` char(10) NOT NULL,
	`amount` int NOT NULL,
	`crypto_wallet_address` varchar(255) NOT NULL,
	`withdrawl_status` enum('PENDING','PROCESSED','VALIDATING','REJECTED'),
	`withdrawal_method` enum('BSC','TRX','ETH','Bitcoin') NOT NULL,
	`created_at` timestamp(6) NOT NULL,
	`updated_at` timestamp(6) NOT NULL,
	`table_identifier_token` enum('USER','TWAL','MWAL','RTNG','MORD','NEWS','MPRO','TORD','TWDP','TWWD','MWDP','MWWD') NOT NULL DEFAULT 'MWWD',
	CONSTRAINT `mining_wallet_withdraw_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `news` (
	`id` char(10) NOT NULL,
	`effective_date` timestamp(6) NOT NULL,
	`heading` varchar(255) NOT NULL,
	`details` varchar(1023) NOT NULL,
	`created_at` timestamp(6) NOT NULL,
	`updated_at` timestamp(6) NOT NULL,
	`table_identifier_token` enum('USER','TWAL','MWAL','RTNG','MORD','NEWS','MPRO','TORD','TWDP','TWWD','MWDP','MWWD') NOT NULL DEFAULT 'NEWS',
	CONSTRAINT `news_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rating` (
	`id` char(10) NOT NULL,
	`associated_user` char(10) NOT NULL,
	`rating_star_count` tinyint NOT NULL,
	`created_at` timestamp(6) NOT NULL,
	`updated_at` timestamp(6) NOT NULL,
	`table_identifier_token` enum('USER','TWAL','MWAL','RTNG','MORD','NEWS','MPRO','TORD','TWDP','TWWD','MWDP','MWWD') NOT NULL DEFAULT 'RTNG',
	CONSTRAINT `rating_id` PRIMARY KEY(`id`),
	CONSTRAINT `rating_associated_user_unique` UNIQUE(`associated_user`)
);
--> statement-breakpoint
CREATE TABLE `trading_order` (
	`id` char(10) NOT NULL,
	`ordered_by` char(10) NOT NULL,
	`amount_invested` int NOT NULL,
	`amount_received` int DEFAULT 0,
	`investment_status` enum('ACTIVE','COMPLETED'),
	`created_at` timestamp(6) NOT NULL,
	`updated_at` timestamp(6) NOT NULL,
	`table_identifier_token` enum('USER','TWAL','MWAL','RTNG','MORD','NEWS','MPRO','TORD','TWDP','TWWD','MWDP','MWWD') NOT NULL DEFAULT 'TORD',
	CONSTRAINT `trading_order_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `trading_wallet` (
	`id` char(10) NOT NULL,
	`balance` float(2),
	`associated_user` char(10) NOT NULL,
	`created_at` timestamp(6) NOT NULL,
	`updated_at` timestamp(6) NOT NULL,
	`table_identifier_token` enum('USER','TWAL','MWAL','RTNG','MORD','NEWS','MPRO','TORD','TWDP','TWWD','MWDP','MWWD') NOT NULL DEFAULT 'TWAL',
	CONSTRAINT `trading_wallet_id` PRIMARY KEY(`id`),
	CONSTRAINT `trading_wallet_associated_user_unique` UNIQUE(`associated_user`)
);
--> statement-breakpoint
CREATE TABLE `trading_wallet_deposits` (
	`id` char(10) NOT NULL,
	`ordered_by` char(10) NOT NULL,
	`wallet` char(10) NOT NULL,
	`amount` int NOT NULL,
	`deposit_status` enum('PENDING','PROCESSED','VALIDATING','REJECTED'),
	`deposit_method` enum('BSC','TRX','ETH','Bitcoin') NOT NULL,
	`transaction_id` varchar(127) NOT NULL,
	`deposit_proof` varchar(255) NOT NULL,
	`created_at` timestamp(6) NOT NULL,
	`updated_at` timestamp(6) NOT NULL,
	`table_identifier_token` enum('USER','TWAL','MWAL','RTNG','MORD','NEWS','MPRO','TORD','TWDP','TWWD','MWDP','MWWD') NOT NULL DEFAULT 'TWDP',
	CONSTRAINT `trading_wallet_deposits_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `trading_wallet_withdraw` (
	`id` char(10) NOT NULL,
	`ordered_by` char(10) NOT NULL,
	`wallet` char(10) NOT NULL,
	`amount` int NOT NULL,
	`crypto_walet_address` varchar(255) NOT NULL,
	`withdrawl_status` enum('PENDING','PROCESSED','VALIDATING','REJECTED'),
	`withdrawl_method` enum('BSC','TRX','ETH','Bitcoin') NOT NULL,
	`created_at` timestamp(6) NOT NULL,
	`updated_at` timestamp(6) NOT NULL,
	`table_identifier_token` enum('USER','TWAL','MWAL','RTNG','MORD','NEWS','MPRO','TORD','TWDP','TWWD','MWDP','MWWD') NOT NULL DEFAULT 'TWWD',
	CONSTRAINT `trading_wallet_withdraw_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` char(10) NOT NULL,
	`email` varchar(255) NOT NULL,
	`full_name` varchar(255) NOT NULL,
	`avatar_url` varchar(255) NOT NULL,
	`age` int NOT NULL,
	`role` enum('ADMIN','BASIC') NOT NULL,
	`phone_number` char(10) NOT NULL,
	`referrer_id` char(10),
	`user_status` enum('ACTIVE','INACTIVE','BLOCKED'),
	`created_at` timestamp(6) NOT NULL,
	`updated_at` timestamp(6) NOT NULL,
	`table_identifier_token` enum('USER','TWAL','MWAL','RTNG','MORD','NEWS','MPRO','TORD','TWDP','TWWD','MWDP','MWWD') NOT NULL DEFAULT 'USER',
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `mining_order` ADD CONSTRAINT `mining_order_ordered_by_user_id_fk` FOREIGN KEY (`ordered_by`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `mining_order` ADD CONSTRAINT `mining_order_mining_profile_used_mining_profile_id_fk` FOREIGN KEY (`mining_profile_used`) REFERENCES `mining_profile`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `mining_wallet` ADD CONSTRAINT `mining_wallet_associated_user_user_id_fk` FOREIGN KEY (`associated_user`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `mining_wallet_deposits` ADD CONSTRAINT `mining_wallet_deposits_ordered_by_user_id_fk` FOREIGN KEY (`ordered_by`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `mining_wallet_deposits` ADD CONSTRAINT `mining_wallet_deposits_wallet_mining_wallet_id_fk` FOREIGN KEY (`wallet`) REFERENCES `mining_wallet`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `mining_wallet_withdraw` ADD CONSTRAINT `mining_wallet_withdraw_ordered_by_user_id_fk` FOREIGN KEY (`ordered_by`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `mining_wallet_withdraw` ADD CONSTRAINT `mining_wallet_withdraw_wallet_mining_wallet_id_fk` FOREIGN KEY (`wallet`) REFERENCES `mining_wallet`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `rating` ADD CONSTRAINT `rating_associated_user_user_id_fk` FOREIGN KEY (`associated_user`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `trading_order` ADD CONSTRAINT `trading_order_ordered_by_user_id_fk` FOREIGN KEY (`ordered_by`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `trading_wallet` ADD CONSTRAINT `trading_wallet_associated_user_user_id_fk` FOREIGN KEY (`associated_user`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `trading_wallet_deposits` ADD CONSTRAINT `trading_wallet_deposits_ordered_by_user_id_fk` FOREIGN KEY (`ordered_by`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `trading_wallet_deposits` ADD CONSTRAINT `trading_wallet_deposits_wallet_trading_wallet_id_fk` FOREIGN KEY (`wallet`) REFERENCES `trading_wallet`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `trading_wallet_withdraw` ADD CONSTRAINT `trading_wallet_withdraw_ordered_by_user_id_fk` FOREIGN KEY (`ordered_by`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `trading_wallet_withdraw` ADD CONSTRAINT `trading_wallet_withdraw_wallet_trading_wallet_id_fk` FOREIGN KEY (`wallet`) REFERENCES `trading_wallet`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `user` ADD CONSTRAINT `users_referrer_id_fk` FOREIGN KEY (`referrer_id`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE cascade;