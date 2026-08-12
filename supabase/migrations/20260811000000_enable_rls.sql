-- ============================================================================
-- PUSPA-Z — Enable Row Level Security (RLS) on all application tables
-- ============================================================================
-- Purpose:
--   The PUSPA-Z app (Next.js + Prisma + Supabase SSR auth) currently relies
--   solely on application-layer privilege checks. No RLS policies exist.
--   This migration enables RLS on every table defined in prisma/schema.prisma
--   and creates a consistent, role-based policy set for the `authenticated`
--   role (Supabase JWT holders).
--
--   Policy model (roles: 'staff' | 'admin' | 'developer' — see
--   src/lib/auth.ts; role is read from user.user_metadata.role, which maps to
--   the JWT claim path auth.jwt() -> 'user_metadata' ->> 'role'):
--     * SELECT : any authenticated user  (USING (true))
--     * INSERT : staff / admin / developer
--     * UPDATE : staff / admin / developer
--     * DELETE : admin / developer only
--
--   NOTE: This is a DEFENSIVE migration. The Prisma client connects with the
--   Supabase service_role key, which bypasses RLS entirely, so application
--   behaviour is unchanged. RLS protects any direct client / anon / exposed
--   Supabase access to the database.
--
--   Idempotency: DROP POLICY IF EXISTS precedes every CREATE POLICY and
--   ALTER TABLE ... ENABLE ROW LEVEL SECURITY is safe to re-run, so this
--   file can be applied repeatedly without error.
--
--   Table names are double-quoted because Prisma created them as CamelCase
--   identifiers (PostgreSQL folds unquoted identifiers to lowercase); the
--   `User` table is additionally a reserved keyword.
--
-- Date:        2026-08-11
-- Generated-by: Hermes Agent (automated security audit remediation)
-- Target:      PostgreSQL 15 (Supabase)
-- ============================================================================

-- ────────────────────────────────────────────────────────────────────────────
-- 1. "User"  (model User — reserved keyword, must be quoted)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_User" ON "User";
CREATE POLICY "authenticated_select_User" ON "User" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_User" ON "User";
CREATE POLICY "staff_insert_User" ON "User" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_User" ON "User";
CREATE POLICY "staff_update_User" ON "User" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_User" ON "User";
CREATE POLICY "admin_delete_User" ON "User" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));

-- ────────────────────────────────────────────────────────────────────────────
-- 2. "Member"  (model Member)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "Member" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_Member" ON "Member";
CREATE POLICY "authenticated_select_Member" ON "Member" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_Member" ON "Member";
CREATE POLICY "staff_insert_Member" ON "Member" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_Member" ON "Member";
CREATE POLICY "staff_update_Member" ON "Member" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_Member" ON "Member";
CREATE POLICY "admin_delete_Member" ON "Member" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));

-- ────────────────────────────────────────────────────────────────────────────
-- 3. "HouseholdMember"  (model HouseholdMember)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "HouseholdMember" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_HouseholdMember" ON "HouseholdMember";
CREATE POLICY "authenticated_select_HouseholdMember" ON "HouseholdMember" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_HouseholdMember" ON "HouseholdMember";
CREATE POLICY "staff_insert_HouseholdMember" ON "HouseholdMember" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_HouseholdMember" ON "HouseholdMember";
CREATE POLICY "staff_update_HouseholdMember" ON "HouseholdMember" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_HouseholdMember" ON "HouseholdMember";
CREATE POLICY "admin_delete_HouseholdMember" ON "HouseholdMember" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));

-- ────────────────────────────────────────────────────────────────────────────
-- 4. "Case"  (model Case)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "Case" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_Case" ON "Case";
CREATE POLICY "authenticated_select_Case" ON "Case" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_Case" ON "Case";
CREATE POLICY "staff_insert_Case" ON "Case" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_Case" ON "Case";
CREATE POLICY "staff_update_Case" ON "Case" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_Case" ON "Case";
CREATE POLICY "admin_delete_Case" ON "Case" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));

-- ────────────────────────────────────────────────────────────────────────────
-- 5. "CaseNote"  (model CaseNote)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "CaseNote" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_CaseNote" ON "CaseNote";
CREATE POLICY "authenticated_select_CaseNote" ON "CaseNote" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_CaseNote" ON "CaseNote";
CREATE POLICY "staff_insert_CaseNote" ON "CaseNote" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_CaseNote" ON "CaseNote";
CREATE POLICY "staff_update_CaseNote" ON "CaseNote" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_CaseNote" ON "CaseNote";
CREATE POLICY "admin_delete_CaseNote" ON "CaseNote" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));

-- ────────────────────────────────────────────────────────────────────────────
-- 6. "CaseProgramme"  (model CaseProgramme)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "CaseProgramme" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_CaseProgramme" ON "CaseProgramme";
CREATE POLICY "authenticated_select_CaseProgramme" ON "CaseProgramme" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_CaseProgramme" ON "CaseProgramme";
CREATE POLICY "staff_insert_CaseProgramme" ON "CaseProgramme" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_CaseProgramme" ON "CaseProgramme";
CREATE POLICY "staff_update_CaseProgramme" ON "CaseProgramme" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_CaseProgramme" ON "CaseProgramme";
CREATE POLICY "admin_delete_CaseProgramme" ON "CaseProgramme" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));

-- ────────────────────────────────────────────────────────────────────────────
-- 7. "Donor"  (model Donor)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "Donor" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_Donor" ON "Donor";
CREATE POLICY "authenticated_select_Donor" ON "Donor" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_Donor" ON "Donor";
CREATE POLICY "staff_insert_Donor" ON "Donor" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_Donor" ON "Donor";
CREATE POLICY "staff_update_Donor" ON "Donor" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_Donor" ON "Donor";
CREATE POLICY "admin_delete_Donor" ON "Donor" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));

-- ────────────────────────────────────────────────────────────────────────────
-- 8. "Donation"  (model Donation)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "Donation" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_Donation" ON "Donation";
CREATE POLICY "authenticated_select_Donation" ON "Donation" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_Donation" ON "Donation";
CREATE POLICY "staff_insert_Donation" ON "Donation" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_Donation" ON "Donation";
CREATE POLICY "staff_update_Donation" ON "Donation" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_Donation" ON "Donation";
CREATE POLICY "admin_delete_Donation" ON "Donation" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));

-- ────────────────────────────────────────────────────────────────────────────
-- 9. "Disbursement"  (model Disbursement)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "Disbursement" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_Disbursement" ON "Disbursement";
CREATE POLICY "authenticated_select_Disbursement" ON "Disbursement" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_Disbursement" ON "Disbursement";
CREATE POLICY "staff_insert_Disbursement" ON "Disbursement" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_Disbursement" ON "Disbursement";
CREATE POLICY "staff_update_Disbursement" ON "Disbursement" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_Disbursement" ON "Disbursement";
CREATE POLICY "admin_delete_Disbursement" ON "Disbursement" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));

-- ────────────────────────────────────────────────────────────────────────────
-- 10. "Programme"  (model Programme)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "Programme" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_Programme" ON "Programme";
CREATE POLICY "authenticated_select_Programme" ON "Programme" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_Programme" ON "Programme";
CREATE POLICY "staff_insert_Programme" ON "Programme" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_Programme" ON "Programme";
CREATE POLICY "staff_update_Programme" ON "Programme" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_Programme" ON "Programme";
CREATE POLICY "admin_delete_Programme" ON "Programme" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));

-- ────────────────────────────────────────────────────────────────────────────
-- 11. "ProgrammeBeneficiary"  (model ProgrammeBeneficiary)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "ProgrammeBeneficiary" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_ProgrammeBeneficiary" ON "ProgrammeBeneficiary";
CREATE POLICY "authenticated_select_ProgrammeBeneficiary" ON "ProgrammeBeneficiary" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_ProgrammeBeneficiary" ON "ProgrammeBeneficiary";
CREATE POLICY "staff_insert_ProgrammeBeneficiary" ON "ProgrammeBeneficiary" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_ProgrammeBeneficiary" ON "ProgrammeBeneficiary";
CREATE POLICY "staff_update_ProgrammeBeneficiary" ON "ProgrammeBeneficiary" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_ProgrammeBeneficiary" ON "ProgrammeBeneficiary";
CREATE POLICY "admin_delete_ProgrammeBeneficiary" ON "ProgrammeBeneficiary" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));

-- ────────────────────────────────────────────────────────────────────────────
-- 12. "Volunteer"  (model Volunteer)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "Volunteer" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_Volunteer" ON "Volunteer";
CREATE POLICY "authenticated_select_Volunteer" ON "Volunteer" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_Volunteer" ON "Volunteer";
CREATE POLICY "staff_insert_Volunteer" ON "Volunteer" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_Volunteer" ON "Volunteer";
CREATE POLICY "staff_update_Volunteer" ON "Volunteer" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_Volunteer" ON "Volunteer";
CREATE POLICY "admin_delete_Volunteer" ON "Volunteer" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));

-- ────────────────────────────────────────────────────────────────────────────
-- 13. "VolunteerActivity"  (model VolunteerActivity)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "VolunteerActivity" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_VolunteerActivity" ON "VolunteerActivity";
CREATE POLICY "authenticated_select_VolunteerActivity" ON "VolunteerActivity" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_VolunteerActivity" ON "VolunteerActivity";
CREATE POLICY "staff_insert_VolunteerActivity" ON "VolunteerActivity" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_VolunteerActivity" ON "VolunteerActivity";
CREATE POLICY "staff_update_VolunteerActivity" ON "VolunteerActivity" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_VolunteerActivity" ON "VolunteerActivity";
CREATE POLICY "admin_delete_VolunteerActivity" ON "VolunteerActivity" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));

-- ────────────────────────────────────────────────────────────────────────────
-- 14. "VolunteerCertificate"  (model VolunteerCertificate)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "VolunteerCertificate" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_VolunteerCertificate" ON "VolunteerCertificate";
CREATE POLICY "authenticated_select_VolunteerCertificate" ON "VolunteerCertificate" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_VolunteerCertificate" ON "VolunteerCertificate";
CREATE POLICY "staff_insert_VolunteerCertificate" ON "VolunteerCertificate" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_VolunteerCertificate" ON "VolunteerCertificate";
CREATE POLICY "staff_update_VolunteerCertificate" ON "VolunteerCertificate" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_VolunteerCertificate" ON "VolunteerCertificate";
CREATE POLICY "admin_delete_VolunteerCertificate" ON "VolunteerCertificate" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));

-- ────────────────────────────────────────────────────────────────────────────
-- 15. "ComplianceRecord"  (model ComplianceRecord)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "ComplianceRecord" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_ComplianceRecord" ON "ComplianceRecord";
CREATE POLICY "authenticated_select_ComplianceRecord" ON "ComplianceRecord" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_ComplianceRecord" ON "ComplianceRecord";
CREATE POLICY "staff_insert_ComplianceRecord" ON "ComplianceRecord" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_ComplianceRecord" ON "ComplianceRecord";
CREATE POLICY "staff_update_ComplianceRecord" ON "ComplianceRecord" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_ComplianceRecord" ON "ComplianceRecord";
CREATE POLICY "admin_delete_ComplianceRecord" ON "ComplianceRecord" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));

-- ────────────────────────────────────────────────────────────────────────────
-- 16. "EKYCVerification"  (model EKYCVerification)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "EKYCVerification" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_EKYCVerification" ON "EKYCVerification";
CREATE POLICY "authenticated_select_EKYCVerification" ON "EKYCVerification" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_EKYCVerification" ON "EKYCVerification";
CREATE POLICY "staff_insert_EKYCVerification" ON "EKYCVerification" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_EKYCVerification" ON "EKYCVerification";
CREATE POLICY "staff_update_EKYCVerification" ON "EKYCVerification" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_EKYCVerification" ON "EKYCVerification";
CREATE POLICY "admin_delete_EKYCVerification" ON "EKYCVerification" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));

-- ────────────────────────────────────────────────────────────────────────────
-- 17. "Document"  (model Document)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "Document" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_Document" ON "Document";
CREATE POLICY "authenticated_select_Document" ON "Document" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_Document" ON "Document";
CREATE POLICY "staff_insert_Document" ON "Document" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_Document" ON "Document";
CREATE POLICY "staff_update_Document" ON "Document" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_Document" ON "Document";
CREATE POLICY "admin_delete_Document" ON "Document" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));

-- ────────────────────────────────────────────────────────────────────────────
-- 18. "Activity"  (model Activity)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "Activity" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_Activity" ON "Activity";
CREATE POLICY "authenticated_select_Activity" ON "Activity" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_Activity" ON "Activity";
CREATE POLICY "staff_insert_Activity" ON "Activity" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_Activity" ON "Activity";
CREATE POLICY "staff_update_Activity" ON "Activity" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_Activity" ON "Activity";
CREATE POLICY "admin_delete_Activity" ON "Activity" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));

-- ────────────────────────────────────────────────────────────────────────────
-- 19. "AIMemory"  (model AIMemory)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "AIMemory" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_AIMemory" ON "AIMemory";
CREATE POLICY "authenticated_select_AIMemory" ON "AIMemory" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_AIMemory" ON "AIMemory";
CREATE POLICY "staff_insert_AIMemory" ON "AIMemory" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_AIMemory" ON "AIMemory";
CREATE POLICY "staff_update_AIMemory" ON "AIMemory" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_AIMemory" ON "AIMemory";
CREATE POLICY "admin_delete_AIMemory" ON "AIMemory" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));

-- ────────────────────────────────────────────────────────────────────────────
-- 20. "AiConversation"  (model AiConversation)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "AiConversation" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_AiConversation" ON "AiConversation";
CREATE POLICY "authenticated_select_AiConversation" ON "AiConversation" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_AiConversation" ON "AiConversation";
CREATE POLICY "staff_insert_AiConversation" ON "AiConversation" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_AiConversation" ON "AiConversation";
CREATE POLICY "staff_update_AiConversation" ON "AiConversation" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_AiConversation" ON "AiConversation";
CREATE POLICY "admin_delete_AiConversation" ON "AiConversation" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));

-- ────────────────────────────────────────────────────────────────────────────
-- 21. "AiMessage"  (model AiMessage)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "AiMessage" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_AiMessage" ON "AiMessage";
CREATE POLICY "authenticated_select_AiMessage" ON "AiMessage" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_AiMessage" ON "AiMessage";
CREATE POLICY "staff_insert_AiMessage" ON "AiMessage" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_AiMessage" ON "AiMessage";
CREATE POLICY "staff_update_AiMessage" ON "AiMessage" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_AiMessage" ON "AiMessage";
CREATE POLICY "admin_delete_AiMessage" ON "AiMessage" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));

-- ────────────────────────────────────────────────────────────────────────────
-- 22. "OpsWorkItem"  (model OpsWorkItem)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "OpsWorkItem" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_OpsWorkItem" ON "OpsWorkItem";
CREATE POLICY "authenticated_select_OpsWorkItem" ON "OpsWorkItem" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_OpsWorkItem" ON "OpsWorkItem";
CREATE POLICY "staff_insert_OpsWorkItem" ON "OpsWorkItem" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_OpsWorkItem" ON "OpsWorkItem";
CREATE POLICY "staff_update_OpsWorkItem" ON "OpsWorkItem" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_OpsWorkItem" ON "OpsWorkItem";
CREATE POLICY "admin_delete_OpsWorkItem" ON "OpsWorkItem" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));

-- ────────────────────────────────────────────────────────────────────────────
-- 23. "AutomationJob"  (model AutomationJob)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "AutomationJob" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_AutomationJob" ON "AutomationJob";
CREATE POLICY "authenticated_select_AutomationJob" ON "AutomationJob" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_AutomationJob" ON "AutomationJob";
CREATE POLICY "staff_insert_AutomationJob" ON "AutomationJob" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_AutomationJob" ON "AutomationJob";
CREATE POLICY "staff_update_AutomationJob" ON "AutomationJob" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_AutomationJob" ON "AutomationJob";
CREATE POLICY "admin_delete_AutomationJob" ON "AutomationJob" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));

-- ────────────────────────────────────────────────────────────────────────────
-- 24. "Entrepreneur"  (model Entrepreneur)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "Entrepreneur" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_Entrepreneur" ON "Entrepreneur";
CREATE POLICY "authenticated_select_Entrepreneur" ON "Entrepreneur" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_Entrepreneur" ON "Entrepreneur";
CREATE POLICY "staff_insert_Entrepreneur" ON "Entrepreneur" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_Entrepreneur" ON "Entrepreneur";
CREATE POLICY "staff_update_Entrepreneur" ON "Entrepreneur" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_Entrepreneur" ON "Entrepreneur";
CREATE POLICY "admin_delete_Entrepreneur" ON "Entrepreneur" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));

-- ────────────────────────────────────────────────────────────────────────────
-- 25. "OrganizationMember"  (model OrganizationMember)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "OrganizationMember" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_OrganizationMember" ON "OrganizationMember";
CREATE POLICY "authenticated_select_OrganizationMember" ON "OrganizationMember" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_OrganizationMember" ON "OrganizationMember";
CREATE POLICY "staff_insert_OrganizationMember" ON "OrganizationMember" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_OrganizationMember" ON "OrganizationMember";
CREATE POLICY "staff_update_OrganizationMember" ON "OrganizationMember" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_OrganizationMember" ON "OrganizationMember";
CREATE POLICY "admin_delete_OrganizationMember" ON "OrganizationMember" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));

-- ────────────────────────────────────────────────────────────────────────────
-- 26. "Institution"  (model Institution)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "Institution" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_Institution" ON "Institution";
CREATE POLICY "authenticated_select_Institution" ON "Institution" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_Institution" ON "Institution";
CREATE POLICY "staff_insert_Institution" ON "Institution" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_Institution" ON "Institution";
CREATE POLICY "staff_update_Institution" ON "Institution" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_Institution" ON "Institution";
CREATE POLICY "admin_delete_Institution" ON "Institution" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));

-- ────────────────────────────────────────────────────────────────────────────
-- 27. "AidApplication"  (model AidApplication)
-- ────────────────────────────────────────────────────────────────────────────
ALTER TABLE "AidApplication" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_AidApplication" ON "AidApplication";
CREATE POLICY "authenticated_select_AidApplication" ON "AidApplication" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "staff_insert_AidApplication" ON "AidApplication";
CREATE POLICY "staff_insert_AidApplication" ON "AidApplication" FOR INSERT TO authenticated WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "staff_update_AidApplication" ON "AidApplication";
CREATE POLICY "staff_update_AidApplication" ON "AidApplication" FOR UPDATE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer')) WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('staff', 'admin', 'developer'));

DROP POLICY IF EXISTS "admin_delete_AidApplication" ON "AidApplication";
CREATE POLICY "admin_delete_AidApplication" ON "AidApplication" FOR DELETE TO authenticated USING ((auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'developer'));
