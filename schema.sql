drop table if exists transactions;
create table transactions (
  id integer primary key autoincrement,
  username text not null,
  message text null,
  type text null,
  timestamp real null,
  hide INTEGER NOT NULL DEFAULT 0
);