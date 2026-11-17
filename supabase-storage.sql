create or replace function public.is_school_firebase_user()
returns boolean
language sql
stable
as $$
  select coalesce(
    (auth.jwt()->>'iss' = 'https://securetoken.google.com/school-memories-6bb13')
    and
    (auth.jwt()->>'aud' = 'school-memories-6bb13')
    and
    nullif(auth.jwt()->>'sub', '') is not null,
    false
  );
$$;

create or replace function public.is_school_admin()
returns boolean
language sql
stable
as $$
  select
    public.is_school_firebase_user()
    and auth.jwt()->>'sub' = 'U9D7P7hhukauNmUpLL6STrWtuma2';
$$;

drop policy if exists "school_media_select" on storage.objects;
drop policy if exists "school_media_insert" on storage.objects;
drop policy if exists "school_media_update" on storage.objects;
drop policy if exists "school_media_delete" on storage.objects;

create policy "school_media_select"
on storage.objects
for select
to anon, authenticated
using (
  bucket_id = 'school-media'
  and public.is_school_firebase_user()
);

create policy "school_media_insert"
on storage.objects
for insert
to anon, authenticated
with check (
  bucket_id = 'school-media'
  and public.is_school_firebase_user()
  and (
    public.is_school_admin()
    or
    (
      (storage.foldername(name))[1] in ('reels','posts','profiles','messages','groups')
      and (storage.foldername(name))[2] = (auth.jwt()->>'sub')
    )
  )
);

create policy "school_media_update"
on storage.objects
for update
to anon, authenticated
using (
  bucket_id = 'school-media'
  and public.is_school_firebase_user()
  and (public.is_school_admin() or owner_id = (auth.jwt()->>'sub'))
)
with check (
  bucket_id = 'school-media'
  and public.is_school_firebase_user()
  and (
    public.is_school_admin()
    or
    (
      owner_id = (auth.jwt()->>'sub')
      and (storage.foldername(name))[1] in ('reels','posts','profiles','messages','groups')
      and (storage.foldername(name))[2] = (auth.jwt()->>'sub')
    )
  )
);

create policy "school_media_delete"
on storage.objects
for delete
to anon, authenticated
using (
  bucket_id = 'school-media'
  and public.is_school_firebase_user()
  and (public.is_school_admin() or owner_id = (auth.jwt()->>'sub'))
);
