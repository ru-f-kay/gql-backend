import { Migration } from '@mikro-orm/migrations';

export class Migration20220612130614 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" varchar(255) not null, "role" text check ("role" in (\'admin\', \'user\')) not null);');
    this.addSql('create index "user_id_index" on "user" ("id");');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user" cascade;');
  }

}
