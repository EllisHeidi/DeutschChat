-- DeutschChat — Phase 1 / Step 5
-- 20260911090000_service_role_grants.sql
--
-- Deployment fix, not a schema change. `service_role` bypasses RLS by design
-- (it has BYPASSRLS), but Postgres privilege checks are independent of RLS —
-- without an explicit GRANT, service_role still gets "permission denied" on
-- every table. The earlier migrations only granted anon/authenticated.
--
-- lib/supabase/admin.ts (server-only) is the only intended user of this role;
-- ordinary app traffic runs as anon/authenticated and is unaffected.
grant usage on schema public to service_role;

grant select, insert, update, delete on all tables in schema public
to service_role;

grant usage, select on all sequences in schema public to service_role;

-- Keep future tables covered without another migration.
alter default privileges in schema public
  grant select, insert, update, delete on tables to service_role;
alter default privileges in schema public
  grant usage, select on sequences to service_role;
