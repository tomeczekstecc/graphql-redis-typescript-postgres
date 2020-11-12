import { Migration } from '@mikro-orm/migrations';

export class Migration20201110223654 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "users" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "usernane" text not null, "password" text not null);'
    );
    this.addSql(
      'alter table "users" add constraint "user_usernane_unique" unique ("usernane");'
    );
  }
}
