-- CreateTable
CREATE TABLE "address" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER,
    "default" BOOLEAN,
    "blk_no" TEXT,
    "floor" TEXT,
    "unit_no" TEXT,
    "building" TEXT,
    "street" TEXT,
    "country" TEXT,
    "post_code" TEXT,
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insert_by" INTEGER,
    "update_time" TIMESTAMP(3),
    "update_by" INTEGER,
    "delete_time" TIMESTAMP(3),
    "delete_by" INTEGER,
    "home" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assign_worker_histories" (
    "id" SERIAL NOT NULL,
    "job_id" INTEGER,
    "worker_id" INTEGER,
    "handyman_id" INTEGER,
    "assign_time" TIMESTAMP(3),

    CONSTRAINT "assign_worker_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banner" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "app" SMALLINT NOT NULL,
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insert_by" INTEGER,
    "update_time" TIMESTAMP(3),
    "update_by" INTEGER,
    "delete_time" TIMESTAMP(3),
    "delete_by" INTEGER,

    CONSTRAINT "banner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "channel" (
    "id" SERIAL NOT NULL,
    "job_id" INTEGER,
    "job_code" TEXT,
    "status" INTEGER DEFAULT 1,
    "customer_id" INTEGER,
    "handyman_id" INTEGER,
    "worker_id" INTEGER,
    "offer_id" INTEGER,
    "last_message" TEXT,
    "last_image" TEXT,
    "last_sent_time" TIMESTAMP(3),
    "worker_join_date" TIMESTAMP(3),
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insert_by" INTEGER,
    "update_time" TIMESTAMP(3),
    "update_by" INTEGER,
    "delete_time" TIMESTAMP(3),
    "delete_by" INTEGER,
    "group" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "color" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "app" INTEGER NOT NULL,

    CONSTRAINT "color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT,
    "email" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "mobile_number" TEXT,
    "home_number" TEXT,
    "status" INTEGER DEFAULT 1,
    "activate_time" TIMESTAMP(3),
    "device_token" TEXT,
    "avatar" TEXT,
    "star" DOUBLE PRECISION DEFAULT 0,
    "star_count" INTEGER DEFAULT 0,
    "reward_point" DOUBLE PRECISION DEFAULT 0,
    "device_info" JSONB,
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insert_by" INTEGER,
    "update_time" TIMESTAMP(3),
    "update_by" INTEGER,
    "delete_time" TIMESTAMP(3),
    "delete_by" INTEGER,
    "blk_no" TEXT,
    "floor" TEXT,
    "unit_no" TEXT,
    "building" TEXT,
    "street" TEXT,
    "country" TEXT,
    "post_code" TEXT,
    "name" TEXT,
    "googleToken" TEXT,
    "calendarStatus" BOOLEAN,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "extra" (
    "id" SERIAL NOT NULL,
    "job_id" INTEGER,
    "type" INTEGER,
    "amount" DOUBLE PRECISION,
    "gst" DOUBLE PRECISION,
    "note" TEXT,
    "status" INTEGER DEFAULT 1,
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insert_by" INTEGER,
    "update_time" TIMESTAMP(3),
    "update_by" INTEGER,
    "delete_time" TIMESTAMP(3),
    "delete_by" INTEGER,
    "accept_time" TIMESTAMP(3),
    "handyman_id" INTEGER,
    "customer_id" INTEGER,

    CONSTRAINT "extra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" SERIAL NOT NULL,
    "job_id" INTEGER,
    "job_code" TEXT,
    "offer_id" INTEGER,
    "handyman_id" INTEGER,
    "customer_id" INTEGER,
    "note" TEXT,
    "image" TEXT[],
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insert_by" INTEGER,
    "cancelTime" TIMESTAMP(3),
    "completeTime" TIMESTAMP(3),
    "incompleteTime" TIMESTAMP(3),

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback_photo" (
    "id" SERIAL NOT NULL,
    "feedback_id" INTEGER,
    "uri" TEXT,
    "is_video" BOOLEAN NOT NULL DEFAULT false,
    "thumbnail" TEXT,

    CONSTRAINT "feedback_photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "handyman" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT,
    "email" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" INTEGER,
    "status" INTEGER DEFAULT 1,
    "first_name" TEXT,
    "last_name" TEXT,
    "mobile_number" TEXT,
    "version_number_click" INTEGER,
    "activate_time" TIMESTAMP(3),
    "approve_time" TIMESTAMP(3),
    "device_token" TEXT,
    "deactivate_by" INTEGER,
    "position" INTEGER,
    "position_other" TEXT,
    "device_info" JSONB,
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insert_by" INTEGER,
    "update_time" TIMESTAMP(3),
    "update_by" INTEGER,
    "delete_time" TIMESTAMP(3),
    "delete_by" INTEGER,
    "reminder" BOOLEAN DEFAULT false,
    "avatar" TEXT,
    "name" TEXT,
    "services" INTEGER[],
    "main_holder_id" INTEGER,
    "googleToken" TEXT,
    "calendarStatus" BOOLEAN,
    "gst" TEXT,
    "service_pending" INTEGER[],
    "address" TEXT,
    "uen" TEXT,

    CONSTRAINT "handyman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "history_action" (
    "id" SERIAL NOT NULL,
    "job_id" INTEGER,
    "job_code" TEXT,
    "offer_id" INTEGER,
    "handyman_id" INTEGER,
    "customer_id" INTEGER,
    "status" INTEGER NOT NULL DEFAULT 1,
    "content" TEXT,
    "action_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "schedule_time" TIMESTAMP(3),
    "note" TEXT,
    "amount" INTEGER,
    "amount_type" INTEGER,
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insert_by" INTEGER,
    "update_time" TIMESTAMP(3),
    "update_by" INTEGER,
    "delete_time" TIMESTAMP(3),
    "delete_by" INTEGER,

    CONSTRAINT "history_action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "history_offer" (
    "id" SERIAL NOT NULL,
    "handyman_id" INTEGER,
    "offer_id" INTEGER,
    "amount" DOUBLE PRECISION,
    "status" INTEGER DEFAULT 1,
    "note" TEXT,
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insert_by" INTEGER,
    "labour_cost" DOUBLE PRECISION,
    "material_cost" DOUBLE PRECISION,
    "mobilization_cost" DOUBLE PRECISION,
    "schedule_time" TIMESTAMP(3),
    "update_time" TIMESTAMP(3),
    "update_by" INTEGER,
    "delete_time" TIMESTAMP(3),
    "delete_by" INTEGER,

    CONSTRAINT "history_offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job" (
    "id" SERIAL NOT NULL,
    "code" TEXT,
    "customer_id" INTEGER,
    "service_id" INTEGER,
    "address_id" INTEGER,
    "offer_count" INTEGER DEFAULT 0,
    "is_urgent" BOOLEAN,
    "paid_amount" DOUBLE PRECISION,
    "gst_amount" DOUBLE PRECISION,
    "image" TEXT[],
    "video" TEXT[],
    "note" TEXT,
    "indicative_value" INTEGER,
    "expect_time" TIMESTAMP(3),
    "expire_time" TIMESTAMP(3),
    "status" INTEGER DEFAULT 2,
    "progress_time" TIMESTAMP(3),
    "complete_time" TIMESTAMP(3),
    "owner_complete_time" TIMESTAMP(3),
    "cancel_time" TIMESTAMP(3),
    "cancel_by" INTEGER,
    "is_abort" BOOLEAN DEFAULT false,
    "complete_by" INTEGER,
    "reason" INTEGER,
    "count_reschedule" INTEGER DEFAULT 0,
    "hm_count_reschedule" INTEGER DEFAULT 0,
    "edit_time" TIMESTAMP(3),
    "notify" BOOLEAN DEFAULT false,
    "notify_24h" BOOLEAN DEFAULT false,
    "notify_2h" BOOLEAN DEFAULT false,
    "can_cancel" BOOLEAN DEFAULT true,
    "payment_status" INTEGER DEFAULT 1,
    "handyman_id" INTEGER,
    "worker_id" INTEGER,
    "labour_cost" DOUBLE PRECISION,
    "material_cost" DOUBLE PRECISION,
    "mobilization_cost" DOUBLE PRECISION,
    "schedule_time" TIMESTAMP(3),
    "arrive_time" TIMESTAMP(3),
    "handyman_note" TEXT,
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insert_by" INTEGER,
    "update_time" TIMESTAMP(3),
    "update_by" INTEGER,
    "delete_time" TIMESTAMP(3),
    "delete_by" INTEGER,
    "new_schedule_time" TIMESTAMP(3),
    "complete_note" TEXT,
    "cancel_note" TEXT,
    "offer_fixelist_id" INTEGER[],
    "history" JSONB[],
    "offer_id" INTEGER,
    "fixelist_feedback" TEXT,
    "fixel_feedback" TEXT,
    "incomplete" BOOLEAN NOT NULL DEFAULT false,
    "payment_fixelist_time" TIMESTAMP(3),
    "payment_fixel_time" TIMESTAMP(3),
    "on_hold" BOOLEAN DEFAULT false,
    "approveFixelist" BOOLEAN DEFAULT false,
    "approveFixel" BOOLEAN DEFAULT false,

    CONSTRAINT "job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_media" (
    "id" SERIAL NOT NULL,
    "job_id" INTEGER,
    "uri" TEXT,
    "is_video" BOOLEAN NOT NULL DEFAULT false,
    "thumbnail" TEXT,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "is_cancelled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "job_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "app" INTEGER NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" SERIAL NOT NULL,
    "content" TEXT,
    "image" TEXT,
    "is_seen" BOOLEAN DEFAULT false,
    "channel_id" INTEGER,
    "handyman_id" INTEGER,
    "customer_id" INTEGER,
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insert_by" INTEGER,
    "update_time" TIMESTAMP(3),
    "update_by" INTEGER,
    "delete_time" TIMESTAMP(3),
    "delete_by" INTEGER,
    "owner_seen" BOOLEAN DEFAULT false,
    "fixelist_seen" BOOLEAN DEFAULT false,
    "worker_seen" BOOLEAN DEFAULT false,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "milestone" (
    "id" SERIAL NOT NULL,
    "job_id" INTEGER,
    "job_code" TEXT,
    "handyman_id" INTEGER,
    "customer_id" INTEGER,
    "milestoneTime" TIMESTAMP(3),
    "text" TEXT,
    "type" INTEGER,
    "status" INTEGER NOT NULL DEFAULT 1,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insert_by" INTEGER,
    "delete_time" TIMESTAMP(3),
    "delete_by" INTEGER,

    CONSTRAINT "milestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_customer" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER,
    "is_seen" BOOLEAN DEFAULT false,
    "type" INTEGER,
    "content" TEXT,
    "job_id" INTEGER,
    "job_code" TEXT,
    "offer_id" INTEGER,
    "maintenance_time" TIMESTAMP(3),
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insert_by" INTEGER,
    "update_time" TIMESTAMP(3),
    "update_by" INTEGER,
    "delete_time" TIMESTAMP(3),
    "delete_by" INTEGER,
    "handyman_id" INTEGER,

    CONSTRAINT "notification_customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_handyman" (
    "id" SERIAL NOT NULL,
    "handyman_id" INTEGER,
    "is_seen" BOOLEAN DEFAULT false,
    "type" INTEGER,
    "content" TEXT,
    "job_id" INTEGER,
    "job_code" TEXT,
    "offer_id" INTEGER,
    "maintenance_time" TIMESTAMP(3),
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insert_by" INTEGER,
    "update_time" TIMESTAMP(3),
    "update_by" INTEGER,
    "delete_time" TIMESTAMP(3),
    "delete_by" INTEGER,
    "customer_id" INTEGER,

    CONSTRAINT "notification_handyman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offer" (
    "id" SERIAL NOT NULL,
    "job_id" INTEGER,
    "service_id" INTEGER,
    "is_urgent" BOOLEAN,
    "handyman_id" INTEGER,
    "labour_cost" DOUBLE PRECISION,
    "material_cost" DOUBLE PRECISION,
    "mobilization_cost" DOUBLE PRECISION,
    "gst" DOUBLE PRECISION,
    "note" TEXT,
    "schedule_time" TIMESTAMP(3),
    "status" INTEGER DEFAULT 1,
    "expire_time" TIMESTAMP(3),
    "arrive_time" TIMESTAMP(3),
    "cancel_time" TIMESTAMP(3),
    "cancel_by" INTEGER,
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insert_by" INTEGER,
    "update_time" TIMESTAMP(3),
    "update_by" INTEGER,
    "delete_time" TIMESTAMP(3),
    "delete_by" INTEGER,
    "history" JSONB[],

    CONSTRAINT "offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "type" INTEGER,
    "job_code" TEXT,
    "customer_id" INTEGER,
    "handyman_id" INTEGER,
    "charge_id" TEXT,
    "job_id" INTEGER,
    "offer_id" INTEGER,
    "extra_id" INTEGER,
    "amount" DOUBLE PRECISION,
    "net" DOUBLE PRECISION,
    "fee" DOUBLE PRECISION,
    "fee_vat" DOUBLE PRECISION,
    "interest" DOUBLE PRECISION,
    "interest_vat" DOUBLE PRECISION,
    "funding_amount" DOUBLE PRECISION,
    "refunded_amount" DOUBLE PRECISION,
    "refundable" BOOLEAN NOT NULL DEFAULT false,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "currency" TEXT,
    "funding_currency" TEXT,
    "status" TEXT,
    "response" JSONB,
    "result" INTEGER DEFAULT 0,
    "ref_charge_id" TEXT,
    "result_time" TIMESTAMP(3),
    "progress_time" TIMESTAMP(3),
    "penalty" DOUBLE PRECISION,
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insert_by" INTEGER,
    "update_time" TIMESTAMP(3),
    "update_by" INTEGER,
    "delete_time" TIMESTAMP(3),
    "delete_by" INTEGER,
    "approve" BOOLEAN DEFAULT false,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotion" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insert_by" INTEGER,
    "update_time" TIMESTAMP(3),
    "update_by" INTEGER,
    "delete_time" TIMESTAMP(3),
    "delete_by" INTEGER,

    CONSTRAINT "promotion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipient" (
    "id" SERIAL NOT NULL,
    "recipient_id" TEXT,
    "verified" BOOLEAN,
    "verified_at" TIMESTAMP(3),
    "active" BOOLEAN,
    "activated_at" TIMESTAMP(3),
    "bank_name" TEXT,
    "bank_number" TEXT,
    "bank_brand" TEXT,
    "handyman_id" INTEGER,
    "status" INTEGER DEFAULT 1,
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insert_by" INTEGER,
    "update_time" TIMESTAMP(3),
    "update_by" INTEGER,
    "delete_time" TIMESTAMP(3),
    "delete_by" INTEGER,

    CONSTRAINT "recipient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reschedule" (
    "id" SERIAL NOT NULL,
    "job_id" INTEGER,
    "note" TEXT,
    "status" INTEGER DEFAULT 1,
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insert_by" INTEGER,
    "update_time" TIMESTAMP(3),
    "update_by" INTEGER,
    "delete_time" TIMESTAMP(3),
    "delete_by" INTEGER,
    "reschedule_by" INTEGER,
    "offer_id" INTEGER,
    "arrive_time" TIMESTAMP(3),
    "handyman_id" INTEGER,
    "customer_id" INTEGER,
    "schedule_time" TIMESTAMP(3),
    "confirm_time" TIMESTAMP(3),
    "confirm_by" INTEGER,

    CONSTRAINT "reschedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "job_code" TEXT NOT NULL,
    "job_id" INTEGER,
    "star_for_customer" INTEGER,
    "star_for_handyman" INTEGER,
    "time_for_customer" TIMESTAMP(3),
    "time_for_handyman" TIMESTAMP(3),
    "content_for_customer" TEXT,
    "content_for_handyman" TEXT,
    "active_for_customer" BOOLEAN DEFAULT true,
    "active_for_handyman" BOOLEAN DEFAULT true,
    "customer_id" INTEGER,
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insert_by" INTEGER,
    "update_time" TIMESTAMP(3),
    "update_by" INTEGER,
    "delete_time" TIMESTAMP(3),
    "delete_by" INTEGER,
    "handyman_id" INTEGER,

    CONSTRAINT "review_pkey" PRIMARY KEY ("job_code")
);

-- CreateTable
CREATE TABLE "service" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "icon" TEXT,
    "color" TEXT,
    "second_color" TEXT,
    "code" VARCHAR(2),
    "font_size" INTEGER DEFAULT 16,
    "order" INTEGER[],
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insert_by" INTEGER,
    "update_time" TIMESTAMP(3),
    "update_by" INTEGER,
    "delete_time" TIMESTAMP(3),
    "delete_by" INTEGER,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "service_id" INTEGER,
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insert_by" INTEGER,
    "update_time" TIMESTAMP(3),
    "update_by" INTEGER,
    "delete_time" TIMESTAMP(3),
    "delete_by" INTEGER,

    CONSTRAINT "service_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "setting" (
    "id" SERIAL NOT NULL,
    "mobilization_cost" DOUBLE PRECISION DEFAULT 40,
    "max_offer" INTEGER DEFAULT 3,
    "max_image" INTEGER DEFAULT 5,
    "max_video" INTEGER DEFAULT 1,
    "gst" INTEGER DEFAULT 7,
    "max_address" INTEGER DEFAULT 5,
    "delay_pay_minute" INTEGER DEFAULT 10,
    "offer_expire_minute" INTEGER DEFAULT 240,
    "offer_expire_minute_urgent" INTEGER DEFAULT 60,
    "job_expire_minute" INTEGER DEFAULT 240,
    "job_expire_minute_urgent" INTEGER DEFAULT 60,
    "job_expire_day" INTEGER DEFAULT 7,
    "offer_max_range" INTEGER DEFAULT 7,
    "job_expect_max_day" INTEGER DEFAULT 14,
    "job_expect_min_minute" INTEGER DEFAULT 180,
    "job_urgent_minute" INTEGER DEFAULT 1440,
    "arrive_minute" INTEGER DEFAULT 60,
    "reschedule_max_day" INTEGER DEFAULT 7,
    "term_url" TEXT,
    "policy_url" TEXT,
    "faq_url" TEXT,
    "app_log_number" INTEGER,
    "compress_percent" INTEGER DEFAULT 2,
    "image_min_size" INTEGER DEFAULT 3,
    "video_min_size" INTEGER DEFAULT 15,
    "pay_complete_handy" INTEGER DEFAULT 80,
    "pay_cancel_handy" INTEGER DEFAULT 30,
    "pay_abort_handy" INTEGER DEFAULT 20,
    "pay_cancel_owner" INTEGER DEFAULT 50,
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insert_by" INTEGER,
    "update_time" TIMESTAMP(3),
    "update_by" INTEGER,
    "delete_time" TIMESTAMP(3),
    "delete_by" INTEGER,
    "approve_payment" BOOLEAN,

    CONSTRAINT "setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "signin" (
    "id" SERIAL NOT NULL,
    "handyman_id" INTEGER,
    "customer_id" INTEGER,
    "user_id" INTEGER,
    "device_info" JSONB,
    "time" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "signin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "summary_day" (
    "id" SERIAL NOT NULL,
    "day" TEXT,
    "fullDay" TIMESTAMP(3),
    "owner_activate" INTEGER,
    "total_owner_activate" INTEGER,
    "handy_activate" INTEGER,
    "handy_approve" INTEGER,
    "total_handy_approve" INTEGER,
    "new_job" INTEGER,
    "discuss_job" INTEGER,
    "impending_job" INTEGER,
    "complete_job" INTEGER,
    "cancel_job" INTEGER,
    "total_new_job" INTEGER,
    "total_discuss_job" INTEGER,
    "total_impending_job" INTEGER,
    "total_complete_job" INTEGER,
    "total_cancel_job" INTEGER,
    "payment_received" DOUBLE PRECISION,
    "payment_refunded" DOUBLE PRECISION,
    "payment_paid" DOUBLE PRECISION,
    "payment_received_no_gst" DOUBLE PRECISION,
    "payment_refunded_no_gst" DOUBLE PRECISION,
    "payment_paid_no_gst" DOUBLE PRECISION,
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "summary_day_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "summary_month" (
    "id" SERIAL NOT NULL,
    "month" TEXT,
    "fullDay" TIMESTAMP(3),
    "owner_activate" INTEGER,
    "handy_approve" INTEGER,
    "total_owner_activate" INTEGER,
    "total_handy_approve" INTEGER,
    "new_job" INTEGER,
    "payment_received" DOUBLE PRECISION,
    "payment_refunded" DOUBLE PRECISION,
    "payment_paid" DOUBLE PRECISION,
    "payment_received_no_gst" DOUBLE PRECISION,
    "payment_refunded_no_gst" DOUBLE PRECISION,
    "payment_paid_no_gst" DOUBLE PRECISION,
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "handy_activate" INTEGER,
    "discuss_job" INTEGER,
    "impending_job" INTEGER,
    "complete_job" INTEGER,
    "cancel_job" INTEGER,
    "total_new_job" INTEGER,
    "total_discuss_job" INTEGER,
    "total_impending_job" INTEGER,
    "total_complete_job" INTEGER,
    "total_cancel_job" INTEGER,

    CONSTRAINT "summary_month_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "summary_week" (
    "id" SERIAL NOT NULL,
    "week" TEXT,
    "fullDay" TIMESTAMP(3),
    "owner_activate" INTEGER,
    "handy_approve" INTEGER,
    "total_owner_activate" INTEGER,
    "total_handy_approve" INTEGER,
    "new_job" INTEGER,
    "payment_received" DOUBLE PRECISION,
    "payment_refunded" DOUBLE PRECISION,
    "payment_paid" DOUBLE PRECISION,
    "payment_received_no_gst" DOUBLE PRECISION,
    "payment_refunded_no_gst" DOUBLE PRECISION,
    "payment_paid_no_gst" DOUBLE PRECISION,
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "handy_activate" INTEGER,
    "discuss_job" INTEGER,
    "impending_job" INTEGER,
    "complete_job" INTEGER,
    "cancel_job" INTEGER,
    "total_new_job" INTEGER,
    "total_discuss_job" INTEGER,
    "total_impending_job" INTEGER,
    "total_complete_job" INTEGER,
    "total_cancel_job" INTEGER,

    CONSTRAINT "summary_week_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "summary_year" (
    "id" SERIAL NOT NULL,
    "year" TEXT,
    "fullDay" TIMESTAMP(3),
    "owner_activate" INTEGER,
    "handy_approve" INTEGER,
    "total_owner_activate" INTEGER,
    "total_handy_approve" INTEGER,
    "new_job" INTEGER,
    "payment_received" DOUBLE PRECISION,
    "payment_refunded" DOUBLE PRECISION,
    "payment_paid" DOUBLE PRECISION,
    "payment_received_no_gst" DOUBLE PRECISION,
    "payment_refunded_no_gst" DOUBLE PRECISION,
    "payment_paid_no_gst" DOUBLE PRECISION,
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "handy_activate" INTEGER,
    "discuss_job" INTEGER,
    "impending_job" INTEGER,
    "complete_job" INTEGER,
    "cancel_job" INTEGER,
    "total_new_job" INTEGER,
    "total_discuss_job" INTEGER,
    "total_impending_job" INTEGER,
    "total_complete_job" INTEGER,
    "total_cancel_job" INTEGER,

    CONSTRAINT "summary_year_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "text_en" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "app" INTEGER NOT NULL,

    CONSTRAINT "text_en_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "status" INTEGER DEFAULT 1,
    "user_id" INTEGER,
    "handyman_id" INTEGER,
    "customer_id" INTEGER,
    "type" INTEGER,
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT,
    "email" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" INTEGER,
    "first_name" TEXT,
    "last_name" TEXT,
    "insert_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insert_by" INTEGER,
    "update_time" TIMESTAMP(3),
    "update_by" INTEGER,
    "delete_time" TIMESTAMP(3),
    "delete_by" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "channel.offer_id_unique" ON "channel"("offer_id");

-- CreateIndex
CREATE UNIQUE INDEX "channel_unique" ON "channel"("job_id", "handyman_id", "group");

-- CreateIndex
CREATE UNIQUE INDEX "color_unique" ON "color"("key", "app");

-- CreateIndex
CREATE UNIQUE INDEX "customer.email_unique" ON "customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customer.user_name_unique" ON "customer"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "handyman.email_unique" ON "handyman"("email");

-- CreateIndex
CREATE UNIQUE INDEX "handyman.user_name_unique" ON "handyman"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "job.code_unique" ON "job"("code");

-- CreateIndex
CREATE UNIQUE INDEX "job.offer_id_unique" ON "job"("offer_id");

-- CreateIndex
CREATE UNIQUE INDEX "media_unique" ON "media"("key", "app");

-- CreateIndex
CREATE UNIQUE INDEX "payment.charge_id_unique" ON "payment"("charge_id");

-- CreateIndex
CREATE UNIQUE INDEX "review.job_code_unique" ON "review"("job_code");

-- CreateIndex
CREATE UNIQUE INDEX "review.job_id_unique" ON "review"("job_id");

-- CreateIndex
CREATE UNIQUE INDEX "summary_day.day_unique" ON "summary_day"("day");

-- CreateIndex
CREATE UNIQUE INDEX "summary_month.month_unique" ON "summary_month"("month");

-- CreateIndex
CREATE UNIQUE INDEX "summary_week.week_unique" ON "summary_week"("week");

-- CreateIndex
CREATE UNIQUE INDEX "summary_year.year_unique" ON "summary_year"("year");

-- CreateIndex
CREATE UNIQUE INDEX "text_en_unique" ON "text_en"("key", "app");

-- CreateIndex
CREATE UNIQUE INDEX "token.token_unique" ON "token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "user.email_unique" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user.user_name_unique" ON "user"("user_name");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assign_worker_histories" ADD CONSTRAINT "assign_worker_histories_handyman_id_fkey" FOREIGN KEY ("handyman_id") REFERENCES "handyman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assign_worker_histories" ADD CONSTRAINT "assign_worker_histories_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assign_worker_histories" ADD CONSTRAINT "assign_worker_histories_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "handyman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channel" ADD CONSTRAINT "channel_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channel" ADD CONSTRAINT "channel_handyman_id_fkey" FOREIGN KEY ("handyman_id") REFERENCES "handyman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channel" ADD CONSTRAINT "channel_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channel" ADD CONSTRAINT "channel_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channel" ADD CONSTRAINT "channel_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "handyman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extra" ADD CONSTRAINT "extra_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extra" ADD CONSTRAINT "extra_handyman_id_fkey" FOREIGN KEY ("handyman_id") REFERENCES "handyman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extra" ADD CONSTRAINT "extra_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_handyman_id_fkey" FOREIGN KEY ("handyman_id") REFERENCES "handyman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_photo" ADD CONSTRAINT "feedback_photo_feedback_id_fkey" FOREIGN KEY ("feedback_id") REFERENCES "feedback"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "handyman" ADD CONSTRAINT "handyman_main_holder_id_fkey" FOREIGN KEY ("main_holder_id") REFERENCES "handyman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history_action" ADD CONSTRAINT "history_action_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history_action" ADD CONSTRAINT "history_action_handyman_id_fkey" FOREIGN KEY ("handyman_id") REFERENCES "handyman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history_action" ADD CONSTRAINT "history_action_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history_action" ADD CONSTRAINT "history_action_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history_offer" ADD CONSTRAINT "history_offer_handyman_id_fkey" FOREIGN KEY ("handyman_id") REFERENCES "handyman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history_offer" ADD CONSTRAINT "history_offer_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_handyman_id_fkey" FOREIGN KEY ("handyman_id") REFERENCES "handyman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "handyman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_media" ADD CONSTRAINT "job_media_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_handyman_id_fkey" FOREIGN KEY ("handyman_id") REFERENCES "handyman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "milestone" ADD CONSTRAINT "milestone_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "milestone" ADD CONSTRAINT "milestone_handyman_id_fkey" FOREIGN KEY ("handyman_id") REFERENCES "handyman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "milestone" ADD CONSTRAINT "milestone_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_customer" ADD CONSTRAINT "notification_customer_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_customer" ADD CONSTRAINT "notification_customer_handyman_id_fkey" FOREIGN KEY ("handyman_id") REFERENCES "handyman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_customer" ADD CONSTRAINT "notification_customer_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_customer" ADD CONSTRAINT "notification_customer_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_handyman" ADD CONSTRAINT "notification_handyman_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_handyman" ADD CONSTRAINT "notification_handyman_handyman_id_fkey" FOREIGN KEY ("handyman_id") REFERENCES "handyman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_handyman" ADD CONSTRAINT "notification_handyman_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_handyman" ADD CONSTRAINT "notification_handyman_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offer" ADD CONSTRAINT "offer_handyman_id_fkey" FOREIGN KEY ("handyman_id") REFERENCES "handyman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offer" ADD CONSTRAINT "offer_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_extra_id_fkey" FOREIGN KEY ("extra_id") REFERENCES "extra"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_handyman_id_fkey" FOREIGN KEY ("handyman_id") REFERENCES "handyman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipient" ADD CONSTRAINT "recipient_handyman_id_fkey" FOREIGN KEY ("handyman_id") REFERENCES "handyman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reschedule" ADD CONSTRAINT "reschedule_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reschedule" ADD CONSTRAINT "reschedule_handyman_id_fkey" FOREIGN KEY ("handyman_id") REFERENCES "handyman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reschedule" ADD CONSTRAINT "reschedule_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reschedule" ADD CONSTRAINT "reschedule_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_handyman_id_fkey" FOREIGN KEY ("handyman_id") REFERENCES "handyman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_type" ADD CONSTRAINT "service_type_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_handyman_id_fkey" FOREIGN KEY ("handyman_id") REFERENCES "handyman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
