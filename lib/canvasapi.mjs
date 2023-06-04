
  /**
   * @license
   * author: Kiser IT
   * canvasapi.js v0.1.0
   * Released under the MIT license.
   */

import fetch from 'node-fetch';

class base {
	_path = null
	_cache = null
	constructor(cache, path) {
		this._cache = cache; 
		this._path = path;
	}
	storage(webStorage) { 
		this._cache = { storage: webStorage }; 
		return this; 
	} 
	redis(client, ttl) { 
		this._cache = { redis: client, ttl}; 
		return this; 
	} 
	toString() { 
		return this._path; 
	} 
}

class abort extends base {
	constructor(cache, path) {
		super(cache, `${path}/abort`);
	}
	async put({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class abort_all_pending extends base {
	constructor(cache, path) {
		super(cache, `${path}/abort_all_pending`);
	}
	async put({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class accept extends base {
	constructor(cache, path) {
		super(cache, `${path}/accept`);
	}
	async post({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class account_calendars extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/account_calendars`);
		if (id) this._path += `/${id}`;
	}
	async get({search_term, filter, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async put({visible, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class account_notifications extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/account_notifications`);
		if (id) this._path += `/${id}`;
	}
	async get({include_past, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
	async post({account_notification, account_notification_roles, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({account_notification, account_notification_roles, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class accounts extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/accounts`);
		if (id) this._path += `/${id}`;
	}
	account_calendars(id) {
		return new account_calendars(this._cache, this._path, id)
	}
	visible_calendars_count() {
		return new visible_calendars_count(this._cache, this._path)
	}
	search() {
		return new search(this._cache, this._path)
	}
	account_notifications(id) {
		return new account_notifications(this._cache, this._path, id)
	}
	reports(report, id) {
		return new reports(this._cache, this._path, report, id)
	}
	settings() {
		return new settings(this._cache, this._path)
	}
	permissions() {
		return new permissions(this._cache, this._path)
	}
	sub_accounts(id) {
		return new sub_accounts(this._cache, this._path, id)
	}
	terms_of_service() {
		return new terms_of_service(this._cache, this._path)
	}
	help_links() {
		return new help_links(this._cache, this._path)
	}
	courses(id) {
		return new courses(this._cache, this._path, id)
	}
	users(id) {
		return new users(this._cache, this._path, id)
	}
	admins(id) {
		return new admins(this._cache, this._path, id)
	}
	analytics() {
		return new analytics(this._cache, this._path)
	}
	scopes() {
		return new scopes(this._cache, this._path)
	}
	authentication_providers(id) {
		return new authentication_providers(this._cache, this._path, id)
	}
	sso_settings() {
		return new sso_settings(this._cache, this._path)
	}
	blackout_dates(id) {
		return new blackout_dates(this._cache, this._path, id)
	}
	content_migrations(id) {
		return new content_migrations(this._cache, this._path, id)
	}
	csp_settings() {
		return new csp_settings(this._cache, this._path)
	}
	csp_log() {
		return new csp_log(this._cache, this._path)
	}
	terms(id) {
		return new terms(this._cache, this._path, id)
	}
	enrollments(id) {
		return new enrollments(this._cache, this._path, id)
	}
	external_tools(id) {
		return new external_tools(this._cache, this._path, id)
	}
	features() {
		return new features(this._cache, this._path)
	}
	grading_period_sets(id) {
		return new grading_period_sets(this._cache, this._path, id)
	}
	grading_periods(id) {
		return new grading_periods(this._cache, this._path, id)
	}
	grading_standards(id) {
		return new grading_standards(this._cache, this._path, id)
	}
	group_categories(id) {
		return new group_categories(this._cache, this._path, id)
	}
	groups(id) {
		return new groups(this._cache, this._path, id)
	}
	logins(id) {
		return new logins(this._cache, this._path, id)
	}
	root_outcome_group() {
		return new root_outcome_group(this._cache, this._path)
	}
	outcome_groups(id) {
		return new outcome_groups(this._cache, this._path, id)
	}
	outcome_group_links() {
		return new outcome_group_links(this._cache, this._path)
	}
	outcome_imports(id) {
		return new outcome_imports(this._cache, this._path, id)
	}
	outcome_proficiency() {
		return new outcome_proficiency(this._cache, this._path)
	}
	roles(id) {
		return new roles(this._cache, this._path, id)
	}
	rubrics(id) {
		return new rubrics(this._cache, this._path, id)
	}
	shared_brand_configs(id) {
		return new shared_brand_configs(this._cache, this._path, id)
	}
	sis_imports(id) {
		return new sis_imports(this._cache, this._path, id)
	}
	sis_import_errors() {
		return new sis_import_errors(this._cache, this._path)
	}
	assignments(id) {
		return new assignments(this._cache, this._path, id)
	}
	tabs(id) {
		return new tabs(this._cache, this._path, id)
	}
	self_registration() {
		return new self_registration(this._cache, this._path)
	}
	async get({include, start_time, end_time, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async put({account, override_sis_stickiness, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class activate extends base {
	constructor(cache, path) {
		super(cache, `${path}/activate`);
	}
	async post({role_id, role, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class activity extends base {
	constructor(cache, path) {
		super(cache, `${path}/activity`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class activity_stream extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/activity_stream`);
		if (id) this._path += `/${id}`;
	}
	summary() {
		return new summary(this._cache, this._path)
	}
	async get({only_active_courses, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class add_message extends base {
	constructor(cache, path) {
		super(cache, `${path}/add_message`);
	}
	async post({body, attachment_ids, media_comment_id, media_comment_type, recipients, included_messages, user_note, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class add_recipients extends base {
	constructor(cache, path) {
		super(cache, `${path}/add_recipients`);
	}
	async post({recipients, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class add_users extends base {
	constructor(cache, path) {
		super(cache, `${path}/add_users`);
	}
	async post({receiver_ids, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class admins extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/admins`);
		if (id) this._path += `/${id}`;
	}
	async post({user_id, role, role_id, send_confirmation, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
	async get({role, role_id, user_id, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class all_courses extends base {
	constructor(cache, path) {
		super(cache, `${path}/all_courses`);
	}
	async get({search, public_only, open_enrollment_only, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class analytics extends base {
	constructor(cache, path) {
		super(cache, `${path}/analytics`);
	}
	terms(id) {
		return new terms(this._cache, this._path, id)
	}
	current() {
		return new current(this._cache, this._path)
	}
	completed() {
		return new completed(this._cache, this._path)
	}
	activity() {
		return new activity(this._cache, this._path)
	}
	assignments(id) {
		return new assignments(this._cache, this._path, id)
	}
	student_summaries() {
		return new student_summaries(this._cache, this._path)
	}
	users(id) {
		return new users(this._cache, this._path, id)
	}
}

class announcements extends base {
	constructor(cache, path) {
		super(cache, `${path}/announcements`);
	}
	async get({context_codes, start_date, end_date, active_only, latest_only, include, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class anonymous_provisional_grades extends base {
	constructor(cache, path) {
		super(cache, `${path}/anonymous_provisional_grades`);
	}
	status() {
		return new status(this._cache, this._path)
	}
}

class anonymous_submissions extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/anonymous_submissions`);
		if (id) this._path += `/${id}`;
	}
	async get({include, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async put({comment, include, submission, rubric_assessment, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class appointment_groups extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/appointment_groups`);
		if (id) this._path += `/${id}`;
	}
	users(id) {
		return new users(this._cache, this._path, id)
	}
	groups(id) {
		return new groups(this._cache, this._path, id)
	}
	next_appointment() {
		return new next_appointment(this._cache, this._path)
	}
	async get({scope, context_codes, include_past_appointments, include, cancel_reason, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({appointment_group, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({appointment_group, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class asset_id_mapping extends base {
	constructor(cache, path) {
		super(cache, `${path}/asset_id_mapping`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class assign_unassigned_members extends base {
	constructor(cache, path) {
		super(cache, `${path}/assign_unassigned_members`);
	}
	async post({sync, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class assignment_groups extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/assignment_groups`);
		if (id) this._path += `/${id}`;
	}
	assignments(id) {
		return new assignments(this._cache, this._path, id)
	}
	async get({include, assignment_ids, exclude_assignment_submission_types, override_assignment_dates, grading_period_id, scope_assignments_to_student, move_assignments_to, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({name, position, group_weight, sis_source_id, integration_data, rules, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({name, position, group_weight, sis_source_id, integration_data, rules, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class assignment_overrides extends base {
	constructor(cache, path) {
		super(cache, `${path}/assignment_overrides`);
	}
	async get({quiz_assignment_overrides, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class assignments extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/assignments`);
		if (id) this._path += `/${id}`;
	}
	extensions() {
		return new extensions(this._cache, this._path)
	}
	duplicate() {
		return new duplicate(this._cache, this._path)
	}
	bulk_update() {
		return new bulk_update(this._cache, this._path)
	}
	overrides(id) {
		return new overrides(this._cache, this._path, id)
	}
	override() {
		return new override(this._cache, this._path)
	}
	submissions(id) {
		return new submissions(this._cache, this._path, id)
	}
	moderated_students() {
		return new moderated_students(this._cache, this._path)
	}
	provisional_grades(id) {
		return new provisional_grades(this._cache, this._path, id)
	}
	anonymous_provisional_grades() {
		return new anonymous_provisional_grades(this._cache, this._path)
	}
	files(id) {
		return new files(this._cache, this._path, id)
	}
	peer_reviews() {
		return new peer_reviews(this._cache, this._path)
	}
	anonymous_submissions(id) {
		return new anonymous_submissions(this._cache, this._path, id)
	}
	gradeable_students() {
		return new gradeable_students(this._cache, this._path)
	}
	submission_summary() {
		return new submission_summary(this._cache, this._path)
	}
	async get({async, include, search_term, override_assignment_dates, needs_grading_count_by_section, bucket, assignment_ids, order_by, post_to_sis, all_dates, start_time, end_time, user_id, course_id, starts_before, ends_after, account_id, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
	async post({assignment, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({assignment, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class associated_courses extends base {
	constructor(cache, path) {
		super(cache, `${path}/associated_courses`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class audit extends base {
	constructor(cache, path) {
		super(cache, `${path}/audit`);
	}
	authentication() {
		return new authentication(this._cache, this._path)
	}
	course() {
		return new course(this._cache, this._path)
	}
	grade_change() {
		return new grade_change(this._cache, this._path)
	}
}

class authentication extends base {
	constructor(cache, path) {
		super(cache, `${path}/authentication`);
	}
	logins(id) {
		return new logins(this._cache, this._path, id)
	}
	accounts(id) {
		return new accounts(this._cache, this._path, id)
	}
	users(id) {
		return new users(this._cache, this._path, id)
	}
}

class authentication_providers extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/authentication_providers`);
		if (id) this._path += `/${id}`;
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class avatars extends base {
	constructor(cache, path) {
		super(cache, `${path}/avatars`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class batch_create extends base {
	constructor(cache, path) {
		super(cache, `${path}/batch_create`);
	}
	async post({domains, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class batch_update extends base {
	constructor(cache, path) {
		super(cache, `${path}/batch_update`);
	}
	async patch({set_id, grading_periods, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.patch(this._path, { method: 'PATCH', body: api_body, headers }, this._cache)
	}
}

class batches extends base {
	constructor(cache, path) {
		super(cache, `${path}/batches`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class blackout_dates extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/blackout_dates`);
		if (id) this._path += `/${id}`;
	}
	newitem() {
		return new newitem(this._cache, this._path)
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({start_date, end_date, event_title, blackout_dates, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({start_date, end_date, event_title, blackout_dates, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class blueprint_subscriptions extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/blueprint_subscriptions`);
		if (id) this._path += `/${id}`;
	}
	migrations(id) {
		return new migrations(this._cache, this._path, id)
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class blueprint_templates extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/blueprint_templates`);
		if (id) this._path += `/${id}`;
	}
	associated_courses() {
		return new associated_courses(this._cache, this._path)
	}
	update_associations() {
		return new update_associations(this._cache, this._path)
	}
	migrations(id) {
		return new migrations(this._cache, this._path, id)
	}
	restrict_item() {
		return new restrict_item(this._cache, this._path)
	}
	unsynced_changes() {
		return new unsynced_changes(this._cache, this._path)
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class bookmarks extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/bookmarks`);
		if (id) this._path += `/${id}`;
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({name, url, position, data, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({name, url, position, data, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class brand_variables extends base {
	constructor(cache, path) {
		super(cache, `${path}/brand_variables`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class bulk_mark_read extends base {
	constructor(cache, path) {
		super(cache, `${path}/bulk_mark_read`);
	}
	async put({submissionIds, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class bulk_select extends base {
	constructor(cache, path) {
		super(cache, `${path}/bulk_select`);
	}
	async put({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class bulk_update extends base {
	constructor(cache, path) {
		super(cache, `${path}/bulk_update`);
	}
	async put({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class bulk_user_progress extends base {
	constructor(cache, path) {
		super(cache, `${path}/bulk_user_progress`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class by_path extends base {
	constructor(cache, path, full_path) {
		super(cache, `${path}/by_path`);
		if (id) this._path += `/${full_path}`;
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class calendar_events extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/calendar_events`);
		if (id) this._path += `/${id}`;
	}
	reservations(id) {
		return new reservations(this._cache, this._path, id)
	}
	save_enabled_account_calendars() {
		return new save_enabled_account_calendars(this._cache, this._path)
	}
	timetable() {
		return new timetable(this._cache, this._path)
	}
	timetable_events() {
		return new timetable_events(this._cache, this._path)
	}
	async get({type, start_date, end_date, undated, all_events, context_codes, excludes, includes, important_dates, blackout_date, submission_types, exclude_submission_types, cancel_reason, which, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({calendar_event, which, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({calendar_event, which, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class cancel extends base {
	constructor(cache, path) {
		super(cache, `${path}/cancel`);
	}
	async post({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class close extends base {
	constructor(cache, path) {
		super(cache, `${path}/close`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class closed extends base {
	constructor(cache, path) {
		super(cache, `${path}/closed`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class collaborations extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/collaborations`);
		if (id) this._path += `/${id}`;
	}
	members() {
		return new members(this._cache, this._path)
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class colors extends base {
	constructor(cache, path, asset_string) {
		super(cache, `${path}/colors`);
		if (id) this._path += `/${asset_string}`;
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async put({hexcode, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class comm_messages extends base {
	constructor(cache, path) {
		super(cache, `${path}/comm_messages`);
	}
	async get({user_id, start_time, end_time, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class comments extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/comments`);
		if (id) this._path += `/${id}`;
	}
	files(id) {
		return new files(this._cache, this._path, id)
	}
	async put({comment, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class communication extends base {
	constructor(cache, path) {
		super(cache, `${path}/communication`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class communication_channels extends base {
	constructor(cache, path, id, type, address) {
		super(cache, `${path}/communication_channels`);
		if (id) this._path += `/${id}`;
		if (id) this._path += `/${type}`;
		if (id) this._path += `/${address}`;
	}
	push() {
		return new push(this._cache, this._path)
	}
	notification_preferences(notification) {
		return new notification_preferences(this._cache, this._path, notification)
	}
	notification_preference_categories(category) {
		return new notification_preference_categories(this._cache, this._path, category)
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({communication_channel, skip_confirmation, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class complete extends base {
	constructor(cache, path) {
		super(cache, `${path}/complete`);
	}
	async post({attempt, validation_token, access_code, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class completed extends base {
	constructor(cache, path) {
		super(cache, `${path}/completed`);
	}
	activity() {
		return new activity(this._cache, this._path)
	}
	grades() {
		return new grades(this._cache, this._path)
	}
	statistics() {
		return new statistics(this._cache, this._path)
	}
	statistics_by_subaccount() {
		return new statistics_by_subaccount(this._cache, this._path)
	}
}

class conferences extends base {
	constructor(cache, path) {
		super(cache, `${path}/conferences`);
	}
	async get({state, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class content_exports extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/content_exports`);
		if (id) this._path += `/${id}`;
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({export_type, skip_notifications, select, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class content_licenses extends base {
	constructor(cache, path) {
		super(cache, `${path}/content_licenses`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class content_migrations extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/content_migrations`);
		if (id) this._path += `/${id}`;
	}
	migration_issues(id) {
		return new migration_issues(this._cache, this._path, id)
	}
	migrators() {
		return new migrators(this._cache, this._path)
	}
	selective_data() {
		return new selective_data(this._cache, this._path)
	}
	asset_id_mapping() {
		return new asset_id_mapping(this._cache, this._path)
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({migration_type, pre_attachment, settings, date_shift_options, selective_import, select, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({migration_type, pre_attachment, settings, date_shift_options, selective_import, select, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class content_share_users extends base {
	constructor(cache, path) {
		super(cache, `${path}/content_share_users`);
	}
	async get({search_term, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class content_shares extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/content_shares`);
		if (id) this._path += `/${id}`;
	}
	sent() {
		return new sent(this._cache, this._path)
	}
	received() {
		return new received(this._cache, this._path)
	}
	unread_count() {
		return new unread_count(this._cache, this._path)
	}
	add_users() {
		return new add_users(this._cache, this._path)
	}
	async post({receiver_ids, content_type, content_id, read_state, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
	async put({receiver_ids, content_type, content_id, read_state, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class conversations extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/conversations`);
		if (id) this._path += `/${id}`;
	}
	batches() {
		return new batches(this._cache, this._path)
	}
	mark_all_as_read() {
		return new mark_all_as_read(this._cache, this._path)
	}
	add_recipients() {
		return new add_recipients(this._cache, this._path)
	}
	add_message() {
		return new add_message(this._cache, this._path)
	}
	remove_messages() {
		return new remove_messages(this._cache, this._path)
	}
	find_recipients() {
		return new find_recipients(this._cache, this._path)
	}
	unread_count() {
		return new unread_count(this._cache, this._path)
	}
	async get({scope, filter, filter_mode, interleave_submissions, include_all_conversation_ids, include, auto_mark_as_read, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({recipients, subject, body, force_new, group_conversation, attachment_ids, media_comment_id, media_comment_type, user_note, mode, scope, filter, filter_mode, context_code, conversation, conversation_ids, event, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({recipients, subject, body, force_new, group_conversation, attachment_ids, media_comment_id, media_comment_type, user_note, mode, scope, filter, filter_mode, context_code, conversation, conversation_ids, event, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class copy_file extends base {
	constructor(cache, path) {
		super(cache, `${path}/copy_file`);
	}
	async post({source_file_id, on_duplicate, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class copy_folder extends base {
	constructor(cache, path) {
		super(cache, `${path}/copy_folder`);
	}
	async post({source_folder_id, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class course extends base {
	constructor(cache, path) {
		super(cache, `${path}/course`);
	}
	courses(id) {
		return new courses(this._cache, this._path, id)
	}
	accounts(id) {
		return new accounts(this._cache, this._path, id)
	}
}

class course_accounts extends base {
	constructor(cache, path) {
		super(cache, `${path}/course_accounts`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class course_copy extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/course_copy`);
		if (id) this._path += `/${id}`;
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({source_course, except, only, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class course_nicknames extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/course_nicknames`);
		if (id) this._path += `/${id}`;
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async put({nickname, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class course_pacing extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/course_pacing`);
		if (id) this._path += `/${id}`;
	}
	async get({course_pace_id, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({end_date, end_date_context, start_date, start_date_context, exclude_weekends, hard_end_dates, workflow_state, course_pace_module_item_attributes, context_id, context_type, course_pace_id, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({end_date, end_date_context, start_date, start_date_context, exclude_weekends, hard_end_dates, workflow_state, course_pace_module_item_attributes, context_id, context_type, course_pace_id, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class courses extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/courses`);
		if (id) this._path += `/${id}`;
	}
	analytics() {
		return new analytics(this._cache, this._path)
	}
	external_feeds(id) {
		return new external_feeds(this._cache, this._path, id)
	}
	assignments(id) {
		return new assignments(this._cache, this._path, id)
	}
	assignment_groups(id) {
		return new assignment_groups(this._cache, this._path, id)
	}
	blackout_dates(id) {
		return new blackout_dates(this._cache, this._path, id)
	}
	blueprint_templates(id) {
		return new blueprint_templates(this._cache, this._path, id)
	}
	blueprint_subscriptions(id) {
		return new blueprint_subscriptions(this._cache, this._path, id)
	}
	calendar_events(id) {
		return new calendar_events(this._cache, this._path, id)
	}
	collaborations(id) {
		return new collaborations(this._cache, this._path, id)
	}
	potential_collaborators() {
		return new potential_collaborators(this._cache, this._path)
	}
	conferences() {
		return new conferences(this._cache, this._path)
	}
	content_exports(id) {
		return new content_exports(this._cache, this._path, id)
	}
	content_migrations(id) {
		return new content_migrations(this._cache, this._path, id)
	}
	csp_settings() {
		return new csp_settings(this._cache, this._path)
	}
	course_pacing(id) {
		return new course_pacing(this._cache, this._path, id)
	}
	quiz_extensions() {
		return new quiz_extensions(this._cache, this._path)
	}
	users(id) {
		return new users(this._cache, this._path, id)
	}
	files(id) {
		return new files(this._cache, this._path, id)
	}
	students(id) {
		return new students(this._cache, this._path, id)
	}
	search_users() {
		return new search_users(this._cache, this._path)
	}
	recent_students() {
		return new recent_students(this._cache, this._path)
	}
	content_share_users() {
		return new content_share_users(this._cache, this._path)
	}
	preview_html() {
		return new preview_html(this._cache, this._path)
	}
	activity_stream(id) {
		return new activity_stream(this._cache, this._path, id)
	}
	todo() {
		return new todo(this._cache, this._path)
	}
	settings() {
		return new settings(this._cache, this._path)
	}
	student_view_student() {
		return new student_view_student(this._cache, this._path)
	}
	reset_content() {
		return new reset_content(this._cache, this._path)
	}
	effective_due_dates() {
		return new effective_due_dates(this._cache, this._path)
	}
	permissions() {
		return new permissions(this._cache, this._path)
	}
	bulk_user_progress() {
		return new bulk_user_progress(this._cache, this._path)
	}
	dismiss_migration_limitation_message() {
		return new dismiss_migration_limitation_message(this._cache, this._path)
	}
	course_copy(id) {
		return new course_copy(this._cache, this._path, id)
	}
	custom_gradebook_columns(id) {
		return new custom_gradebook_columns(this._cache, this._path, id)
	}
	custom_gradebook_column_data() {
		return new custom_gradebook_column_data(this._cache, this._path)
	}
	discussion_topics(id) {
		return new discussion_topics(this._cache, this._path, id)
	}
	enrollments(id) {
		return new enrollments(this._cache, this._path, id)
	}
	epub_exports(id) {
		return new epub_exports(this._cache, this._path, id)
	}
	external_tools(id) {
		return new external_tools(this._cache, this._path, id)
	}
	features() {
		return new features(this._cache, this._path)
	}
	folders(id) {
		return new folders(this._cache, this._path, id)
	}
	usage_rights() {
		return new usage_rights(this._cache, this._path)
	}
	content_licenses() {
		return new content_licenses(this._cache, this._path)
	}
	gradebook_history(date) {
		return new gradebook_history(this._cache, this._path, date)
	}
	grading_periods(id) {
		return new grading_periods(this._cache, this._path, id)
	}
	grading_standards(id) {
		return new grading_standards(this._cache, this._path, id)
	}
	group_categories(id) {
		return new group_categories(this._cache, this._path, id)
	}
	groups(id) {
		return new groups(this._cache, this._path, id)
	}
	late_policy() {
		return new late_policy(this._cache, this._path)
	}
	line_items(id) {
		return new line_items(this._cache, this._path, id)
	}
	live_assessments(id) {
		return new live_assessments(this._cache, this._path, id)
	}
	media_objects(id) {
		return new media_objects(this._cache, this._path, id)
	}
	modules(id) {
		return new modules(this._cache, this._path, id)
	}
	module_item_sequence() {
		return new module_item_sequence(this._cache, this._path)
	}
	names_and_roles() {
		return new names_and_roles(this._cache, this._path)
	}
	quizzes(id) {
		return new quizzes(this._cache, this._path, id)
	}
	root_outcome_group() {
		return new root_outcome_group(this._cache, this._path)
	}
	outcome_groups(id) {
		return new outcome_groups(this._cache, this._path, id)
	}
	outcome_group_links() {
		return new outcome_group_links(this._cache, this._path)
	}
	outcome_imports(id) {
		return new outcome_imports(this._cache, this._path, id)
	}
	outcome_results() {
		return new outcome_results(this._cache, this._path)
	}
	outcome_rollups() {
		return new outcome_rollups(this._cache, this._path)
	}
	outcome_alignments() {
		return new outcome_alignments(this._cache, this._path)
	}
	front_page() {
		return new front_page(this._cache, this._path)
	}
	pages(id) {
		return new pages(this._cache, this._path, id)
	}
	outcome_proficiency() {
		return new outcome_proficiency(this._cache, this._path)
	}
	progress(id) {
		return new progress(this._cache, this._path, id)
	}
	new_quizzes() {
		return new new_quizzes(this._cache, this._path)
	}
	rubrics(id) {
		return new rubrics(this._cache, this._path, id)
	}
	rubric_associations(id) {
		return new rubric_associations(this._cache, this._path, id)
	}
	sections(id) {
		return new sections(this._cache, this._path, id)
	}
	disable_post_to_sis() {
		return new disable_post_to_sis(this._cache, this._path)
	}
	submissions(id) {
		return new submissions(this._cache, this._path, id)
	}
	tabs(id) {
		return new tabs(this._cache, this._path, id)
	}
	async get({with_enrollments, enrollment_type, published, completed, blueprint, blueprint_associated, by_teachers, by_subaccounts, hide_enrollmentless_courses, state, enrollment_term_id, search_term, include, sort, order, search_by, starts_before, ends_after, homeroom, start_time, end_time, enrollment_role, enrollment_role_id, enrollment_state, exclude_blueprint_courses, event, teacher_limit, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({course, offer, enroll_me, enable_sis_reactivation, override_sis_stickiness, course_ids, event, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
	async put({course, offer, enroll_me, enable_sis_reactivation, override_sis_stickiness, course_ids, event, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class created_group_ids extends base {
	constructor(cache, path) {
		super(cache, `${path}/created_group_ids`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class crosslist extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/crosslist`);
		if (id) this._path += `/${id}`;
	}
	async post({override_sis_stickiness, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class csp_log extends base {
	constructor(cache, path) {
		super(cache, `${path}/csp_log`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class csp_settings extends base {
	constructor(cache, path) {
		super(cache, `${path}/csp_settings`);
	}
	lock() {
		return new lock(this._cache, this._path)
	}
	domains() {
		return new domains(this._cache, this._path)
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async put({status, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class current extends base {
	constructor(cache, path) {
		super(cache, `${path}/current`);
	}
	activity() {
		return new activity(this._cache, this._path)
	}
	grades() {
		return new grades(this._cache, this._path)
	}
	statistics() {
		return new statistics(this._cache, this._path)
	}
	statistics_by_subaccount() {
		return new statistics_by_subaccount(this._cache, this._path)
	}
}

class custom_data extends base {
	constructor(cache, path) {
		super(cache, `${path}/custom_data`);
	}
	async put({ns, data, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async get({ns, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class custom_gradebook_column_data extends base {
	constructor(cache, path) {
		super(cache, `${path}/custom_gradebook_column_data`);
	}
	async put({column_data, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class custom_gradebook_columns extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/custom_gradebook_columns`);
		if (id) this._path += `/${id}`;
	}
	reorder() {
		return new reorder(this._cache, this._path)
	}
	data(id) {
		return new data(this._cache, this._path, id)
	}
	async get({include_hidden, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({column, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({column, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class dashboard_positions extends base {
	constructor(cache, path) {
		super(cache, `${path}/dashboard_positions`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async put({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class data extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/data`);
		if (id) this._path += `/${id}`;
	}
	async get({include_hidden, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async put({column_data, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class days extends base {
	constructor(cache, path) {
		super(cache, `${path}/days`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class details extends base {
	constructor(cache, path) {
		super(cache, `${path}/details`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class disable_post_to_sis extends base {
	constructor(cache, path) {
		super(cache, `${path}/disable_post_to_sis`);
	}
	async put({grading_period_id, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class discussion_topics extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/discussion_topics`);
		if (id) this._path += `/${id}`;
	}
	reorder() {
		return new reorder(this._cache, this._path)
	}
	entries(id) {
		return new entries(this._cache, this._path, id)
	}
	view() {
		return new view(this._cache, this._path)
	}
	duplicate() {
		return new duplicate(this._cache, this._path)
	}
	entry_list() {
		return new entry_list(this._cache, this._path)
	}
	read(item) {
		return new read(this._cache, this._path, item)
	}
	read_all() {
		return new read_all(this._cache, this._path)
	}
	subscribed() {
		return new subscribed(this._cache, this._path)
	}
	async get({include, order_by, scope, only_announcements, filter_by, search_term, exclude_context_module_locked_topics, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({title, message, discussion_type, published, delayed_post_at, allow_rating, lock_at, podcast_enabled, podcast_has_student_posts, require_initial_post, assignment, is_announcement, pinned, position_after, group_category_id, only_graders_can_rate, sort_by_rating, attachment, specific_sections, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({title, message, discussion_type, published, delayed_post_at, allow_rating, lock_at, podcast_enabled, podcast_has_student_posts, require_initial_post, assignment, is_announcement, pinned, position_after, group_category_id, only_graders_can_rate, sort_by_rating, attachment, specific_sections, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class dismiss_migration_limitation_message extends base {
	constructor(cache, path) {
		super(cache, `${path}/dismiss_migration_limitation_message`);
	}
	async post({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class document_annotations extends base {
	constructor(cache, path) {
		super(cache, `${path}/document_annotations`);
	}
	read(item) {
		return new read(this._cache, this._path, item)
	}
}

class domains extends base {
	constructor(cache, path) {
		super(cache, `${path}/domains`);
	}
	batch_create() {
		return new batch_create(this._cache, this._path)
	}
	async post({domain, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class done extends base {
	constructor(cache, path) {
		super(cache, `${path}/done`);
	}
	async put({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class duplicate extends base {
	constructor(cache, path) {
		super(cache, `${path}/duplicate`);
	}
	async post({result_type, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class effective_due_dates extends base {
	constructor(cache, path) {
		super(cache, `${path}/effective_due_dates`);
	}
	async get({assignment_ids, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class enabled extends base {
	constructor(cache, path) {
		super(cache, `${path}/enabled`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class enrollments extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/enrollments`);
		if (id) this._path += `/${id}`;
	}
	accept() {
		return new accept(this._cache, this._path)
	}
	reject() {
		return new reject(this._cache, this._path)
	}
	reactivate() {
		return new reactivate(this._cache, this._path)
	}
	async get({type, role, state, include, user_id, grading_period_id, enrollment_term_id, sis_account_id, sis_course_id, sis_section_id, sis_user_id, created_for_sis_id, task, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({enrollment, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class entries extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/entries`);
		if (id) this._path += `/${id}`;
	}
	replies() {
		return new replies(this._cache, this._path)
	}
	read(item) {
		return new read(this._cache, this._path, item)
	}
	rating() {
		return new rating(this._cache, this._path)
	}
	async put({message, attachment, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
	async post({message, attachment, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class entry_list extends base {
	constructor(cache, path) {
		super(cache, `${path}/entry_list`);
	}
	async get({ids, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class environment extends base {
	constructor(cache, path) {
		super(cache, `${path}/environment`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class eportfolios extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/eportfolios`);
		if (id) this._path += `/${id}`;
	}
	pages(id) {
		return new pages(this._cache, this._path, id)
	}
	moderate() {
		return new moderate(this._cache, this._path)
	}
	restore() {
		return new restore(this._cache, this._path)
	}
	async get({include, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
	async put({spam_status, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class epub_exports extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/epub_exports`);
		if (id) this._path += `/${id}`;
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class error_reports extends base {
	constructor(cache, path) {
		super(cache, `${path}/error_reports`);
	}
	async post({error, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class errors extends base {
	constructor(cache, path) {
		super(cache, `${path}/errors`);
	}
	async get({failure, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class events extends base {
	constructor(cache, path) {
		super(cache, `${path}/events`);
	}
	async post({quiz_submission_events, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async get({attempt, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class exports extends base {
	constructor(cache, path) {
		super(cache, `${path}/export`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class extensions extends base {
	constructor(cache, path) {
		super(cache, `${path}/extensions`);
	}
	async post({assignment_extensions, quiz_extensions, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class external_feeds extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/external_feeds`);
		if (id) this._path += `/${id}`;
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({url, header_match, verbosity, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class external_tools extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/external_tools`);
		if (id) this._path += `/${id}`;
	}
	sessionless_launch() {
		return new sessionless_launch(this._cache, this._path)
	}
	rce_favorites(id) {
		return new rce_favorites(this._cache, this._path, id)
	}
	visible_course_nav_tools() {
		return new visible_course_nav_tools(this._cache, this._path)
	}
	async get({search_term, selectable, include_parents, placement, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({client_id, name, privacy_level, consumer_key, shared_secret, description, url, domain, icon_url, text, custom_fields, is_rce_favorite, account_navigation, user_navigation, course_home_sub_navigation, course_navigation, editor_button, homework_submission, link_selection, migration_selection, tool_configuration, resource_selection, config_type, config_xml, config_url, not_selectable, oauth_compliant, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({client_id, name, privacy_level, consumer_key, shared_secret, description, url, domain, icon_url, text, custom_fields, is_rce_favorite, account_navigation, user_navigation, course_home_sub_navigation, course_navigation, editor_button, homework_submission, link_selection, migration_selection, tool_configuration, resource_selection, config_type, config_xml, config_url, not_selectable, oauth_compliant, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class favorites extends base {
	constructor(cache, path) {
		super(cache, `${path}/favorites`);
	}
	courses(id) {
		return new courses(this._cache, this._path, id)
	}
	groups(id) {
		return new groups(this._cache, this._path, id)
	}
}

class features extends base {
	constructor(cache, path) {
		super(cache, `${path}/features`);
	}
	enabled() {
		return new enabled(this._cache, this._path)
	}
	environment() {
		return new environment(this._cache, this._path)
	}
	flags(feature) {
		return new flags(this._cache, this._path, feature)
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class feed extends base {
	constructor(cache, path) {
		super(cache, `${path}/feed`);
	}
	async get({assignment_id, user_id, ascending, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class file_ref extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/file_ref`);
		if (id) this._path += `/${id}`;
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class files extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/files`);
		if (id) this._path += `/${id}`;
	}
	quota() {
		return new quota(this._cache, this._path)
	}
	public_url() {
		return new public_url(this._cache, this._path)
	}
	file_ref(id) {
		return new file_ref(this._cache, this._path, id)
	}
	icon_metadata() {
		return new icon_metadata(this._cache, this._path)
	}
	reset_verifier() {
		return new reset_verifier(this._cache, this._path)
	}
	originality_report(id) {
		return new originality_report(this._cache, this._path, id)
	}
	async post({name, parent_folder_id, on_duplicate, lock_at, unlock_at, locked, hidden, visibility_level, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async get({content_types, exclude_content_types, search_term, include, only, sort, order, replacement_chain_context_type, replacement_chain_context_id, replace, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async put({name, parent_folder_id, on_duplicate, lock_at, unlock_at, locked, hidden, visibility_level, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class find_recipients extends base {
	constructor(cache, path) {
		super(cache, `${path}/find_recipients`);
	}
	async get({search, context, exclude, type, user_id, from_conversation_id, permissions, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class flag extends base {
	constructor(cache, path) {
		super(cache, `${path}/flag`);
	}
	async put({attempt, validation_token, access_code, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class flags extends base {
	constructor(cache, path, feature) {
		super(cache, `${path}/flags`);
		if (id) this._path += `/${feature}`;
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async put({state, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class folders extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/folders`);
		if (id) this._path += `/${id}`;
	}
	files(id) {
		return new files(this._cache, this._path, id)
	}
	folders(id) {
		return new folders(this._cache, this._path, id)
	}
	by_path(full_path) {
		return new by_path(this._cache, this._path, full_path)
	}
	copy_file() {
		return new copy_file(this._cache, this._path)
	}
	copy_folder() {
		return new copy_folder(this._cache, this._path)
	}
	media() {
		return new media(this._cache, this._path)
	}
	async get({force, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async put({name, parent_folder_id, lock_at, unlock_at, locked, hidden, position, parent_folder_path, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async post({name, parent_folder_id, lock_at, unlock_at, locked, hidden, position, parent_folder_path, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class formatted_answer extends base {
	constructor(cache, path) {
		super(cache, `${path}/formatted_answer`);
	}
	async get({answer, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class front_page extends base {
	constructor(cache, path) {
		super(cache, `${path}/front_page`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async put({wiki_page, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class global extends base {
	constructor(cache, path) {
		super(cache, `${path}/global`);
	}
	root_outcome_group() {
		return new root_outcome_group(this._cache, this._path)
	}
	outcome_groups(id) {
		return new outcome_groups(this._cache, this._path, id)
	}
}

class grade_change extends base {
	constructor(cache, path) {
		super(cache, `${path}/grade_change`);
	}
	assignments(id) {
		return new assignments(this._cache, this._path, id)
	}
	courses(id) {
		return new courses(this._cache, this._path, id)
	}
	students(id) {
		return new students(this._cache, this._path, id)
	}
	graders(id) {
		return new graders(this._cache, this._path, id)
	}
	async get({course_id, assignment_id, student_id, grader_id, start_time, end_time, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class gradeable_students extends base {
	constructor(cache, path) {
		super(cache, `${path}/gradeable_students`);
	}
	async get({assignment_ids, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class gradebook_history extends base {
	constructor(cache, path, date) {
		super(cache, `${path}/gradebook_history`);
		if (id) this._path += `/${date}`;
	}
	days() {
		return new days(this._cache, this._path)
	}
	graders(id) {
		return new graders(this._cache, this._path, id)
	}
	feed() {
		return new feed(this._cache, this._path)
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class graded_submissions extends base {
	constructor(cache, path) {
		super(cache, `${path}/graded_submissions`);
	}
	async get({include, only_current_enrollments, only_published_assignments, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class graders extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/graders`);
		if (id) this._path += `/${id}`;
	}
	assignments(id) {
		return new assignments(this._cache, this._path, id)
	}
	async get({start_time, end_time, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class grades extends base {
	constructor(cache, path) {
		super(cache, `${path}/grades`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class grading_period_sets extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/grading_period_sets`);
		if (id) this._path += `/${id}`;
	}
	grading_periods(id) {
		return new grading_periods(this._cache, this._path, id)
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({enrollment_term_ids, grading_period_set, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async patch({enrollment_term_ids, grading_period_set, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.patch(this._path, { method: 'PATCH', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class grading_periods extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/grading_periods`);
		if (id) this._path += `/${id}`;
	}
	batch_update() {
		return new batch_update(this._cache, this._path)
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async put({grading_periods, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class grading_standards extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/grading_standards`);
		if (id) this._path += `/${id}`;
	}
	async post({title, grading_scheme_entry, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class group_categories extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/group_categories`);
		if (id) this._path += `/${id}`;
	}
	imports() {
		return new imports(this._cache, this._path)
	}
	groups(id) {
		return new groups(this._cache, this._path, id)
	}
	exports() {
		return new exports(this._cache, this._path)
	}
	users(id) {
		return new users(this._cache, this._path, id)
	}
	assign_unassigned_members() {
		return new assign_unassigned_members(this._cache, this._path)
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({name, self_signup, auto_leader, group_limit, sis_group_category_id, create_group_count, split_group_count, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({name, self_signup, auto_leader, group_limit, sis_group_category_id, create_group_count, split_group_count, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class groups extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/groups`);
		if (id) this._path += `/${id}`;
	}
	external_feeds(id) {
		return new external_feeds(this._cache, this._path, id)
	}
	assignments(id) {
		return new assignments(this._cache, this._path, id)
	}
	collaborations(id) {
		return new collaborations(this._cache, this._path, id)
	}
	potential_collaborators() {
		return new potential_collaborators(this._cache, this._path)
	}
	conferences() {
		return new conferences(this._cache, this._path)
	}
	content_exports(id) {
		return new content_exports(this._cache, this._path, id)
	}
	content_migrations(id) {
		return new content_migrations(this._cache, this._path, id)
	}
	discussion_topics(id) {
		return new discussion_topics(this._cache, this._path, id)
	}
	external_tools(id) {
		return new external_tools(this._cache, this._path, id)
	}
	files(id) {
		return new files(this._cache, this._path, id)
	}
	folders(id) {
		return new folders(this._cache, this._path, id)
	}
	usage_rights() {
		return new usage_rights(this._cache, this._path)
	}
	content_licenses() {
		return new content_licenses(this._cache, this._path)
	}
	invite() {
		return new invite(this._cache, this._path)
	}
	users(id) {
		return new users(this._cache, this._path, id)
	}
	preview_html() {
		return new preview_html(this._cache, this._path)
	}
	activity_stream(id) {
		return new activity_stream(this._cache, this._path, id)
	}
	permissions() {
		return new permissions(this._cache, this._path)
	}
	memberships(id) {
		return new memberships(this._cache, this._path, id)
	}
	media_objects(id) {
		return new media_objects(this._cache, this._path, id)
	}
	names_and_roles() {
		return new names_and_roles(this._cache, this._path)
	}
	front_page() {
		return new front_page(this._cache, this._path)
	}
	pages(id) {
		return new pages(this._cache, this._path, id)
	}
	reorder() {
		return new reorder(this._cache, this._path)
	}
	tabs(id) {
		return new tabs(this._cache, this._path, id)
	}
	async get({registration_status, context_type, include, only_own_groups, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({name, description, is_public, join_level, storage_quota_mb, sis_group_id, avatar_id, members, override_sis_stickiness, quiz_groups, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
	async put({name, description, is_public, join_level, storage_quota_mb, sis_group_id, avatar_id, members, override_sis_stickiness, quiz_groups, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class help_links extends base {
	constructor(cache, path) {
		super(cache, `${path}/help_links`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class history extends base {
	constructor(cache, path) {
		super(cache, `${path}/history`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class icon_metadata extends base {
	constructor(cache, path) {
		super(cache, `${path}/icon_metadata`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class imports extends base {
	constructor(cache, path) {
		super(cache, `${path}/import`);
	}
	async post({attachment, source_outcome_group_id, async, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class importing extends base {
	constructor(cache, path) {
		super(cache, `${path}/importing`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class inst_access_tokens extends base {
	constructor(cache, path) {
		super(cache, `${path}/inst_access_tokens`);
	}
	async post({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class invite extends base {
	constructor(cache, path) {
		super(cache, `${path}/invite`);
	}
	async post({invitees, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class ip_filters extends base {
	constructor(cache, path) {
		super(cache, `${path}/ip_filters`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class items extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/items`);
		if (id) this._path += `/${id}`;
	}
	select_mastery_path() {
		return new select_mastery_path(this._cache, this._path)
	}
	done() {
		return new done(this._cache, this._path)
	}
	mark_read() {
		return new mark_read(this._cache, this._path)
	}
	media_upload_url() {
		return new media_upload_url(this._cache, this._path)
	}
	async get({include, search_term, student_id, start_date, end_date, context_codes, observed_user_id, filter, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({module_item, item, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({module_item, item, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
	async patch({module_item, item, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.patch(this._path, { method: 'PATCH', body: api_body, headers }, this._cache)
	}
}

class jwts extends base {
	constructor(cache, path) {
		super(cache, `${path}/jwts`);
	}
	refresh() {
		return new refresh(this._cache, this._path)
	}
	async post({workflows, context_type, context_id, context_uuid, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class kaltura extends base {
	constructor(cache, path) {
		super(cache, `${path}/kaltura`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class kaltura_session extends base {
	constructor(cache, path) {
		super(cache, `${path}/kaltura_session`);
	}
	async post({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class last_attended extends base {
	constructor(cache, path) {
		super(cache, `${path}/last_attended`);
	}
	async put({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class late_policy extends base {
	constructor(cache, path) {
		super(cache, `${path}/late_policy`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({late_policy, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async patch({late_policy, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.patch(this._path, { method: 'PATCH', body: api_body, headers }, this._cache)
	}
}

class latest extends base {
	constructor(cache, path) {
		super(cache, `${path}/latest`);
	}
	async get({summary, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class line_items extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/line_items`);
		if (id) this._path += `/${id}`;
	}
	results(id) {
		return new results(this._cache, this._path, id)
	}
	scores() {
		return new scores(this._cache, this._path)
	}
	async post({scoreMaximum, label, resourceId, tag, resourceLinkId, endDateTime, submission_type, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({scoreMaximum, label, resourceId, tag, resourceLinkId, endDateTime, submission_type, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async get({include, tag, resource_id, resource_link_id, limit, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class live_assessments extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/live_assessments`);
		if (id) this._path += `/${id}`;
	}
	results(id) {
		return new results(this._cache, this._path, id)
	}
	async post({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class lock extends base {
	constructor(cache, path) {
		super(cache, `${path}/lock`);
	}
	async put({settings_locked, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class logins extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/logins`);
		if (id) this._path += `/${id}`;
	}
	async get({start_time, end_time, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({user, login, override_sis_stickiness, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({user, login, override_sis_stickiness, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class manageable_accounts extends base {
	constructor(cache, path) {
		super(cache, `${path}/manageable_accounts`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class manually_created_courses_account extends base {
	constructor(cache, path) {
		super(cache, `${path}/manually_created_courses_account`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class mark_all_as_read extends base {
	constructor(cache, path) {
		super(cache, `${path}/mark_all_as_read`);
	}
	async post({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class mark_read extends base {
	constructor(cache, path) {
		super(cache, `${path}/mark_read`);
	}
	async post({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class media extends base {
	constructor(cache, path) {
		super(cache, `${path}/media`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class media_attachments extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/media_attachments`);
		if (id) this._path += `/${id}`;
	}
	async put({user_entered_title, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class media_objects extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/media_objects`);
		if (id) this._path += `/${id}`;
	}
	media_tracks() {
		return new media_tracks(this._cache, this._path)
	}
	async get({sort, order, exclude, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async put({user_entered_title, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class media_tracks extends base {
	constructor(cache, path) {
		super(cache, `${path}/media_tracks`);
	}
	async get({include, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async put({include, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class media_upload_url extends base {
	constructor(cache, path) {
		super(cache, `${path}/media_upload_url`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class members extends base {
	constructor(cache, path) {
		super(cache, `${path}/members`);
	}
	async get({include, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class memberships extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/memberships`);
		if (id) this._path += `/${id}`;
	}
	async get({filter_states, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({user_id, workflow_state, moderator, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({user_id, workflow_state, moderator, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class merge_into extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/merge_into`);
		if (id) this._path += `/${id}`;
	}
	accounts(id) {
		return new accounts(this._cache, this._path, id)
	}
	async put({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class message extends base {
	constructor(cache, path) {
		super(cache, `${path}/message`);
	}
	async post({conversations, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class migration_issues extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/migration_issues`);
		if (id) this._path += `/${id}`;
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async put({workflow_state, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class migrations extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/migrations`);
		if (id) this._path += `/${id}`;
	}
	details() {
		return new details(this._cache, this._path)
	}
	async post({comment, send_notification, copy_settings, publish_after_initial_sync, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class migrators extends base {
	constructor(cache, path) {
		super(cache, `${path}/migrators`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class missing_submissions extends base {
	constructor(cache, path) {
		super(cache, `${path}/missing_submissions`);
	}
	async get({observed_user_id, include, filter, course_ids, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class moderate extends base {
	constructor(cache, path) {
		super(cache, `${path}/moderate`);
	}
	async put({spam_status, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class moderated_students extends base {
	constructor(cache, path) {
		super(cache, `${path}/moderated_students`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({student_ids, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class module_item_sequence extends base {
	constructor(cache, path) {
		super(cache, `${path}/module_item_sequence`);
	}
	async get({asset_type, asset_id, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class modules extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/modules`);
		if (id) this._path += `/${id}`;
	}
	relock() {
		return new relock(this._cache, this._path)
	}
	items(id) {
		return new items(this._cache, this._path, id)
	}
	async get({include, search_term, student_id, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({module, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({module, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class names_and_roles extends base {
	constructor(cache, path) {
		super(cache, `${path}/names_and_roles`);
	}
	async get({rlid, role, limit, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class newitem extends base {
	constructor(cache, path) {
		super(cache, `${path}/new`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class new_quizzes extends base {
	constructor(cache, path) {
		super(cache, `${path}/new_quizzes`);
	}
	assignment_overrides() {
		return new assignment_overrides(this._cache, this._path)
	}
}

class next_appointment extends base {
	constructor(cache, path) {
		super(cache, `${path}/next_appointment`);
	}
	async get({appointment_group_ids, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class notification_preference_categories extends base {
	constructor(cache, path, category) {
		super(cache, `${path}/notification_preference_categories`);
		if (id) this._path += `/${category}`;
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async put({notification_preferences, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class notification_preferences extends base {
	constructor(cache, path, notification) {
		super(cache, `${path}/notification_preferences`);
		if (id) this._path += `/${notification}`;
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async put({notification_preferences, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class observees extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/observees`);
		if (id) this._path += `/${id}`;
	}
	async get({include, root_account_id, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({observee, access_token, pairing_code, root_account_id, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({observee, access_token, pairing_code, root_account_id, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class observer_pairing_codes extends base {
	constructor(cache, path) {
		super(cache, `${path}/observer_pairing_codes`);
	}
	async post({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class observers extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/observers`);
		if (id) this._path += `/${id}`;
	}
	async get({include, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class open extends base {
	constructor(cache, path) {
		super(cache, `${path}/open`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class opened extends base {
	constructor(cache, path) {
		super(cache, `${path}/opened`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class originality_report extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/originality_report`);
		if (id) this._path += `/${id}`;
	}
	async post({originality_report, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({originality_report, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class outcome_alignments extends base {
	constructor(cache, path) {
		super(cache, `${path}/outcome_alignments`);
	}
	async get({student_id, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class outcome_group_links extends base {
	constructor(cache, path) {
		super(cache, `${path}/outcome_group_links`);
	}
	async get({outcome_style, outcome_group_style, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class outcome_groups extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/outcome_groups`);
		if (id) this._path += `/${id}`;
	}
	outcomes(id) {
		return new outcomes(this._cache, this._path, id)
	}
	subgroups() {
		return new subgroups(this._cache, this._path)
	}
	imports() {
		return new imports(this._cache, this._path)
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async put({title, description, vendor_guid, parent_outcome_group_id, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class outcome_imports extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/outcome_imports`);
		if (id) this._path += `/${id}`;
	}
	created_group_ids() {
		return new created_group_ids(this._cache, this._path)
	}
	async post({import_type, attachment, extension, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class outcome_proficiency extends base {
	constructor(cache, path) {
		super(cache, `${path}/outcome_proficiency`);
	}
	async post({ratings, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class outcome_results extends base {
	constructor(cache, path) {
		super(cache, `${path}/outcome_results`);
	}
	async get({user_ids, outcome_ids, include, include_hidden, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class outcome_rollups extends base {
	constructor(cache, path) {
		super(cache, `${path}/outcome_rollups`);
	}
	async get({aggregate, aggregate_stat, user_ids, outcome_ids, include, exclude, sort_by, sort_outcome_id, sort_order, add_defaults, contributing_scores, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class outcomes extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/outcomes`);
		if (id) this._path += `/${id}`;
	}
	async get({outcome_style, add_defaults, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({outcome_id, move_from, title, display_name, description, vendor_guid, mastery_points, ratings, calculation_method, calculation_int, add_defaults, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({outcome_id, move_from, title, display_name, description, vendor_guid, mastery_points, ratings, calculation_method, calculation_int, add_defaults, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class override extends base {
	constructor(cache, path) {
		super(cache, `${path}/override`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class overrides extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/overrides`);
		if (id) this._path += `/${id}`;
	}
	async get({assignment_overrides, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({assignment_override, assignment_overrides, marked_complete, dismissed, plannable_type, plannable_id, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({assignment_override, assignment_overrides, marked_complete, dismissed, plannable_type, plannable_id, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class page_views extends base {
	constructor(cache, path) {
		super(cache, `${path}/page_views`);
	}
	async get({start_time, end_time, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class pages extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/pages`);
		if (id) this._path += `/${id}`;
	}
	duplicate() {
		return new duplicate(this._cache, this._path)
	}
	revisions(id) {
		return new revisions(this._cache, this._path, id)
	}
	async get({sort, order, search_term, published, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({wiki_page, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({wiki_page, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class pandata_events_token extends base {
	constructor(cache, path) {
		super(cache, `${path}/pandata_events_token`);
	}
	async post({app_key, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class peer_reviews extends base {
	constructor(cache, path) {
		super(cache, `${path}/peer_reviews`);
	}
	async get({include, user_id, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({user_id, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class permissions extends base {
	constructor(cache, path) {
		super(cache, `${path}/permissions`);
	}
	async get({permissions, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class planner extends base {
	constructor(cache, path) {
		super(cache, `${path}/planner`);
	}
	items(id) {
		return new items(this._cache, this._path, id)
	}
	overrides(id) {
		return new overrides(this._cache, this._path, id)
	}
}

class planner_notes extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/planner_notes`);
		if (id) this._path += `/${id}`;
	}
	async get({start_date, end_date, context_codes, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async put({title, details, todo_date, course_id, linked_object_type, linked_object_id, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async post({title, details, todo_date, course_id, linked_object_type, linked_object_id, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class poll_choices extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/poll_choices`);
		if (id) this._path += `/${id}`;
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({poll_choices, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({poll_choices, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class poll_sessions extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/poll_sessions`);
		if (id) this._path += `/${id}`;
	}
	open() {
		return new open(this._cache, this._path)
	}
	close() {
		return new close(this._cache, this._path)
	}
	opened() {
		return new opened(this._cache, this._path)
	}
	closed() {
		return new closed(this._cache, this._path)
	}
	poll_submissions(id) {
		return new poll_submissions(this._cache, this._path, id)
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({poll_sessions, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({poll_sessions, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class poll_submissions extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/poll_submissions`);
		if (id) this._path += `/${id}`;
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({poll_submissions, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class polls extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/polls`);
		if (id) this._path += `/${id}`;
	}
	poll_sessions(id) {
		return new poll_sessions(this._cache, this._path, id)
	}
	poll_choices(id) {
		return new poll_choices(this._cache, this._path, id)
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({polls, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({polls, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class potential_collaborators extends base {
	constructor(cache, path) {
		super(cache, `${path}/potential_collaborators`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class preview_html extends base {
	constructor(cache, path) {
		super(cache, `${path}/preview_html`);
	}
	async post({html, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class profile extends base {
	constructor(cache, path) {
		super(cache, `${path}/profile`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class progress extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/progress`);
		if (id) this._path += `/${id}`;
	}
	cancel() {
		return new cancel(this._cache, this._path)
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class provisional_grades extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/provisional_grades`);
		if (id) this._path += `/${id}`;
	}
	bulk_select() {
		return new bulk_select(this._cache, this._path)
	}
	status() {
		return new status(this._cache, this._path)
	}
	select() {
		return new select(this._cache, this._path)
	}
	publish() {
		return new publish(this._cache, this._path)
	}
}

class public_url extends base {
	constructor(cache, path) {
		super(cache, `${path}/public_url`);
	}
	async get({submission_id, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class publish extends base {
	constructor(cache, path) {
		super(cache, `${path}/publish`);
	}
	async post({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class push extends base {
	constructor(cache, path) {
		super(cache, `${path}/push`);
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class questions extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/questions`);
		if (id) this._path += `/${id}`;
	}
	formatted_answer() {
		return new formatted_answer(this._cache, this._path)
	}
	flag() {
		return new flag(this._cache, this._path)
	}
	unflag() {
		return new unflag(this._cache, this._path)
	}
	async get({quiz_submission_id, quiz_submission_attempt, include, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({question, attempt, validation_token, access_code, quiz_questions, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({question, attempt, validation_token, access_code, quiz_questions, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class quiz_extensions extends base {
	constructor(cache, path) {
		super(cache, `${path}/quiz_extensions`);
	}
	async post({user_id, extra_attempts, extra_time, manually_unlocked, extend_from_now, extend_from_end_at, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class quiz_submissions extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/quiz_submissions`);
		if (id) this._path += `/${id}`;
	}
	questions(id) {
		return new questions(this._cache, this._path, id)
	}
}

class quizzes extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/quizzes`);
		if (id) this._path += `/${id}`;
	}
	items(id) {
		return new items(this._cache, this._path, id)
	}
	assignment_overrides() {
		return new assignment_overrides(this._cache, this._path)
	}
	extensions() {
		return new extensions(this._cache, this._path)
	}
	ip_filters() {
		return new ip_filters(this._cache, this._path)
	}
	groups(id) {
		return new groups(this._cache, this._path, id)
	}
	questions(id) {
		return new questions(this._cache, this._path, id)
	}
	reports(report, id) {
		return new reports(this._cache, this._path, report, id)
	}
	statistics() {
		return new statistics(this._cache, this._path)
	}
	submissions(id) {
		return new submissions(this._cache, this._path, id)
	}
	submission_users() {
		return new submission_users(this._cache, this._path)
	}
	submission() {
		return new submission(this._cache, this._path)
	}
	reorder() {
		return new reorder(this._cache, this._path)
	}
	validate_access_code() {
		return new validate_access_code(this._cache, this._path)
	}
	async get({search_term, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({quiz, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async patch({quiz, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.patch(this._path, { method: 'PATCH', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
	async put({quiz, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class quota extends base {
	constructor(cache, path) {
		super(cache, `${path}/quota`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class rating extends base {
	constructor(cache, path) {
		super(cache, `${path}/rating`);
	}
	async post({rating, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class rce_favorites extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/rce_favorites`);
		if (id) this._path += `/${id}`;
	}
	async post({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class reactivate extends base {
	constructor(cache, path) {
		super(cache, `${path}/reactivate`);
	}
	async put({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class read extends base {
	constructor(cache, path, item) {
		super(cache, `${path}/read`);
		if (id) this._path += `/${item}`;
	}
	async put({forced_read_state, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
	async get({forced_read_state, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class read_all extends base {
	constructor(cache, path) {
		super(cache, `${path}/read_all`);
	}
	async put({forced_read_state, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class received extends base {
	constructor(cache, path) {
		super(cache, `${path}/received`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class recent_students extends base {
	constructor(cache, path) {
		super(cache, `${path}/recent_students`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class recipients extends base {
	constructor(cache, path) {
		super(cache, `${path}/recipients`);
	}
	async get({search, context, exclude, type, user_id, from_conversation_id, permissions, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class refresh extends base {
	constructor(cache, path) {
		super(cache, `${path}/refresh`);
	}
	async post({jwt, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class reject extends base {
	constructor(cache, path) {
		super(cache, `${path}/reject`);
	}
	async post({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class relock extends base {
	constructor(cache, path) {
		super(cache, `${path}/relock`);
	}
	async put({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class remove_messages extends base {
	constructor(cache, path) {
		super(cache, `${path}/remove_messages`);
	}
	async post({remove, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class reorder extends base {
	constructor(cache, path) {
		super(cache, `${path}/reorder`);
	}
	async post({order, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class replies extends base {
	constructor(cache, path) {
		super(cache, `${path}/replies`);
	}
	async post({message, attachment, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class reports extends base {
	constructor(cache, path, report, id) {
		super(cache, `${path}/reports`);
		if (id) this._path += `/${report}`;
		if (id) this._path += `/${id}`;
	}
	async get({includes_all_versions, include, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({parameters, quiz_report, include, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class reservations extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/reservations`);
		if (id) this._path += `/${id}`;
	}
	async post({participant_id, comments, cancel_existing, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class reset_content extends base {
	constructor(cache, path) {
		super(cache, `${path}/reset_content`);
	}
	async post({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class reset_password extends base {
	constructor(cache, path) {
		super(cache, `${path}/reset_password`);
	}
	async post({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class reset_verifier extends base {
	constructor(cache, path) {
		super(cache, `${path}/reset_verifier`);
	}
	async post({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class restore extends base {
	constructor(cache, path) {
		super(cache, `${path}/restore`);
	}
	async put({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class restore_states extends base {
	constructor(cache, path) {
		super(cache, `${path}/restore_states`);
	}
	async put({batch_mode, undelete_only, unconclude_only, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class restrict_item extends base {
	constructor(cache, path) {
		super(cache, `${path}/restrict_item`);
	}
	async put({content_type, content_id, restricted, restrictions, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class results extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/results`);
		if (id) this._path += `/${id}`;
	}
	async post({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async get({user_id, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class revisions extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/revisions`);
		if (id) this._path += `/${id}`;
	}
	latest() {
		return new latest(this._cache, this._path)
	}
	async get({summary, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class roles extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/roles`);
		if (id) this._path += `/${id}`;
	}
	activate() {
		return new activate(this._cache, this._path)
	}
	async get({state, show_inherited, role_id, role, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({label, role, base_role_type, permissions, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
	async put({label, role, base_role_type, permissions, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class root_outcome_group extends base {
	constructor(cache, path) {
		super(cache, `${path}/root_outcome_group`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class rubric_assessments extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/rubric_assessments`);
		if (id) this._path += `/${id}`;
	}
	read(item) {
		return new read(this._cache, this._path, item)
	}
	async post({provisional, final, graded_anonymously, rubric_assessment, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({provisional, final, graded_anonymously, rubric_assessment, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class rubric_associations extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/rubric_associations`);
		if (id) this._path += `/${id}`;
	}
	rubric_assessments(id) {
		return new rubric_assessments(this._cache, this._path, id)
	}
	async post({rubric_association, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({rubric_association, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class rubric_comments extends base {
	constructor(cache, path) {
		super(cache, `${path}/rubric_comments`);
	}
	read(item) {
		return new read(this._cache, this._path, item)
	}
}

class rubrics extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/rubrics`);
		if (id) this._path += `/${id}`;
	}
	async post({id, rubric_association_id, rubric, rubric_association, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({id, rubric_association_id, rubric, rubric_association, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
	async get({include, style, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class save_enabled_account_calendars extends base {
	constructor(cache, path) {
		super(cache, `${path}/save_enabled_account_calendars`);
	}
	async post({mark_feature_as_seen, enabled_account_calendars, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class scopes extends base {
	constructor(cache, path) {
		super(cache, `${path}/scopes`);
	}
	async get({group_by, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class scores extends base {
	constructor(cache, path) {
		super(cache, `${path}/scores`);
	}
	async post({userId, activityProgress, gradingProgress, timestamp, scoreGiven, scoreMaximum, comment, submission, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class search extends base {
	constructor(cache, path) {
		super(cache, `${path}/search`);
	}
	recipients() {
		return new recipients(this._cache, this._path)
	}
	all_courses() {
		return new all_courses(this._cache, this._path)
	}
	async get({name, domain, latitude, longitude, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class search_users extends base {
	constructor(cache, path) {
		super(cache, `${path}/search_users`);
	}
	async get({search_term, sort, enrollment_type, enrollment_role, enrollment_role_id, include, user_id, user_ids, enrollment_state, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class sections extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/sections`);
		if (id) this._path += `/${id}`;
	}
	assignments(id) {
		return new assignments(this._cache, this._path, id)
	}
	enrollments(id) {
		return new enrollments(this._cache, this._path, id)
	}
	crosslist(id) {
		return new crosslist(this._cache, this._path, id)
	}
	students(id) {
		return new students(this._cache, this._path, id)
	}
	submissions(id) {
		return new submissions(this._cache, this._path, id)
	}
	async get({include, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({course_section, enable_sis_reactivation, override_sis_stickiness, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({course_section, enable_sis_reactivation, override_sis_stickiness, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class select extends base {
	constructor(cache, path) {
		super(cache, `${path}/select`);
	}
	async put({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class select_mastery_path extends base {
	constructor(cache, path) {
		super(cache, `${path}/select_mastery_path`);
	}
	async post({assignment_set_id, student_id, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class selective_data extends base {
	constructor(cache, path) {
		super(cache, `${path}/selective_data`);
	}
	async get({type, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class self extends base {
	constructor(cache, path) {
		super(cache, `${path}/self`);
	}
	bookmarks(id) {
		return new bookmarks(this._cache, this._path, id)
	}
	communication_channels(id, type, address) {
		return new communication_channels(this._cache, this._path, id, type, address)
	}
	favorites() {
		return new favorites(this._cache, this._path)
	}
	groups(id) {
		return new groups(this._cache, this._path, id)
	}
	files(id) {
		return new files(this._cache, this._path, id)
	}
	activity_stream(id) {
		return new activity_stream(this._cache, this._path, id)
	}
	todo() {
		return new todo(this._cache, this._path)
	}
	todo_item_count() {
		return new todo_item_count(this._cache, this._path)
	}
	upcoming_events() {
		return new upcoming_events(this._cache, this._path)
	}
	pandata_events_token() {
		return new pandata_events_token(this._cache, this._path)
	}
	course_nicknames(id) {
		return new course_nicknames(this._cache, this._path, id)
	}
}

class self_registration extends base {
	constructor(cache, path) {
		super(cache, `${path}/self_registration`);
	}
	async post({user, pseudonym, communication_channel, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class sent extends base {
	constructor(cache, path) {
		super(cache, `${path}/sent`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class services extends base {
	constructor(cache, path) {
		super(cache, `${path}/services`);
	}
	kaltura() {
		return new kaltura(this._cache, this._path)
	}
	kaltura_session() {
		return new kaltura_session(this._cache, this._path)
	}
}

class sessionless_launch extends base {
	constructor(cache, path) {
		super(cache, `${path}/sessionless_launch`);
	}
	async get({id, url, assignment_id, module_item_id, launch_type, resource_link_lookup_uuid, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class sessions extends base {
	constructor(cache, path) {
		super(cache, `${path}/sessions`);
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class settings extends base {
	constructor(cache, path) {
		super(cache, `${path}/settings`);
	}
	async get({manual_mark_as_read, release_notes_badge_disabled, collapse_global_nav, collapse_course_nav, hide_dashcard_color_overlays, comment_library_suggestions_enabled, elementary_dashboard_disabled, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async put({allow_student_discussion_topics, allow_student_forum_attachments, allow_student_discussion_editing, allow_student_organized_groups, allow_student_discussion_reporting, allow_student_anonymous_discussion_topics, filter_speed_grader_by_student_group, hide_final_grades, hide_distribution_graphs, hide_sections_on_course_users_page, lock_all_announcements, usage_rights_required, restrict_student_past_view, restrict_student_future_view, show_announcements_on_home_page, home_page_announcement_limit, syllabus_course_summary, default_due_time, conditional_release, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class shared_brand_configs extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/shared_brand_configs`);
		if (id) this._path += `/${id}`;
	}
	async post({shared_brand_config, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({shared_brand_config, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class sis_import_errors extends base {
	constructor(cache, path) {
		super(cache, `${path}/sis_import_errors`);
	}
	async get({failure, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class sis_imports extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/sis_imports`);
		if (id) this._path += `/${id}`;
	}
	errors() {
		return new errors(this._cache, this._path)
	}
	importing() {
		return new importing(this._cache, this._path)
	}
	restore_states() {
		return new restore_states(this._cache, this._path)
	}
	abort() {
		return new abort(this._cache, this._path)
	}
	abort_all_pending() {
		return new abort_all_pending(this._cache, this._path)
	}
	async get({created_since, created_before, workflow_state, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({import_type, attachment, extension, batch_mode, batch_mode_term_id, multi_term_batch_mode, skip_deletes, override_sis_stickiness, add_sis_stickiness, clear_sis_stickiness, update_sis_id_if_login_claimed, diffing_data_set_identifier, diffing_remaster_data_set, diffing_drop_status, batch_mode_enrollment_drop_status, change_threshold, diff_row_count_threshold, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class split extends base {
	constructor(cache, path) {
		super(cache, `${path}/split`);
	}
	async post({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class sso_settings extends base {
	constructor(cache, path) {
		super(cache, `${path}/sso_settings`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async put({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class statistics extends base {
	constructor(cache, path) {
		super(cache, `${path}/statistics`);
	}
	async get({all_versions, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class statistics_by_subaccount extends base {
	constructor(cache, path) {
		super(cache, `${path}/statistics_by_subaccount`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class status extends base {
	constructor(cache, path) {
		super(cache, `${path}/status`);
	}
	async get({student_id, anonymous_id, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class student_summaries extends base {
	constructor(cache, path) {
		super(cache, `${path}/student_summaries`);
	}
	async get({sort_column, student_id, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class student_view_student extends base {
	constructor(cache, path) {
		super(cache, `${path}/student_view_student`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class students extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/students`);
		if (id) this._path += `/${id}`;
	}
	submissions(id) {
		return new submissions(this._cache, this._path, id)
	}
	async get({start_time, end_time, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class sub_accounts extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/sub_accounts`);
		if (id) this._path += `/${id}`;
	}
	async get({recursive, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({account, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class subgroups extends base {
	constructor(cache, path) {
		super(cache, `${path}/subgroups`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({title, description, vendor_guid, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class submission extends base {
	constructor(cache, path) {
		super(cache, `${path}/submission`);
	}
	async get({include, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class submission_summary extends base {
	constructor(cache, path) {
		super(cache, `${path}/submission_summary`);
	}
	async get({grouped, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class submission_users extends base {
	constructor(cache, path) {
		super(cache, `${path}/submission_users`);
	}
	message() {
		return new message(this._cache, this._path)
	}
}

class submissions extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/submissions`);
		if (id) this._path += `/${id}`;
	}
	originality_report(id) {
		return new originality_report(this._cache, this._path, id)
	}
	peer_reviews() {
		return new peer_reviews(this._cache, this._path)
	}
	history() {
		return new history(this._cache, this._path)
	}
	events() {
		return new events(this._cache, this._path)
	}
	self() {
		return new self(this._cache, this._path)
	}
	complete() {
		return new complete(this._cache, this._path)
	}
	time() {
		return new time(this._cache, this._path)
	}
	comments(id) {
		return new comments(this._cache, this._path, id)
	}
	files(id) {
		return new files(this._cache, this._path, id)
	}
	update_grades() {
		return new update_grades(this._cache, this._path)
	}
	read(item) {
		return new read(this._cache, this._path, item)
	}
	bulk_mark_read() {
		return new bulk_mark_read(this._cache, this._path)
	}
	rubric_comments() {
		return new rubric_comments(this._cache, this._path)
	}
	rubric_assessments(id) {
		return new rubric_assessments(this._cache, this._path, id)
	}
	document_annotations() {
		return new document_annotations(this._cache, this._path)
	}
	async get({include, grouped, student_ids, assignment_ids, post_to_sis, submitted_since, graded_since, grading_period_id, workflow_state, enrollment_state, state_based_on_date, order, order_direction, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async post({access_code, preview, quiz_submissions, comment, submission, include, prefer_points_over_scheme, rubric_assessment, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({access_code, preview, quiz_submissions, comment, submission, include, prefer_points_over_scheme, rubric_assessment, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class subscribed extends base {
	constructor(cache, path) {
		super(cache, `${path}/subscribed`);
	}
	async put({headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class summary extends base {
	constructor(cache, path) {
		super(cache, `${path}/summary`);
	}
	async get({only_active_courses, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class tabs extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/tabs`);
		if (id) this._path += `/${id}`;
	}
	async get({include, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async put({position, hidden, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class terms extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/terms`);
		if (id) this._path += `/${id}`;
	}
	activity() {
		return new activity(this._cache, this._path)
	}
	grades() {
		return new grades(this._cache, this._path)
	}
	statistics() {
		return new statistics(this._cache, this._path)
	}
	statistics_by_subaccount() {
		return new statistics_by_subaccount(this._cache, this._path)
	}
	async post({enrollment_term, override_sis_stickiness, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async put({enrollment_term, override_sis_stickiness, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
	async get({workflow_state, include, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class terms_of_service extends base {
	constructor(cache, path) {
		super(cache, `${path}/terms_of_service`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class time extends base {
	constructor(cache, path) {
		super(cache, `${path}/time`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class timetable extends base {
	constructor(cache, path) {
		super(cache, `${path}/timetable`);
	}
	async post({timetables, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class timetable_events extends base {
	constructor(cache, path) {
		super(cache, `${path}/timetable_events`);
	}
	async post({course_section_id, events, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class todo extends base {
	constructor(cache, path) {
		super(cache, `${path}/todo`);
	}
	async get({include, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class todo_item_count extends base {
	constructor(cache, path) {
		super(cache, `${path}/todo_item_count`);
	}
	async get({include, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class unflag extends base {
	constructor(cache, path) {
		super(cache, `${path}/unflag`);
	}
	async put({attempt, validation_token, access_code, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class unread_count extends base {
	constructor(cache, path) {
		super(cache, `${path}/unread_count`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class unsynced_changes extends base {
	constructor(cache, path) {
		super(cache, `${path}/unsynced_changes`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class upcoming_events extends base {
	constructor(cache, path) {
		super(cache, `${path}/upcoming_events`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class update_associations extends base {
	constructor(cache, path) {
		super(cache, `${path}/update_associations`);
	}
	async put({course_ids_to_add, course_ids_to_remove, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
}

class update_grades extends base {
	constructor(cache, path) {
		super(cache, `${path}/update_grades`);
	}
	async post({grade_data, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class usage_rights extends base {
	constructor(cache, path) {
		super(cache, `${path}/usage_rights`);
	}
	async put({file_ids, folder_ids, publish, usage_rights, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
}

class users extends base {
	constructor(cache, path, id) {
		super(cache, `${path}/users`);
		if (id) this._path += `/${id}`;
	}
	activity() {
		return new activity(this._cache, this._path)
	}
	assignments(id) {
		return new assignments(this._cache, this._path, id)
	}
	communication() {
		return new communication(this._cache, this._path)
	}
	courses(id) {
		return new courses(this._cache, this._path, id)
	}
	self() {
		return new self(this._cache, this._path)
	}
	calendar_events(id) {
		return new calendar_events(this._cache, this._path, id)
	}
	communication_channels(id, type, address) {
		return new communication_channels(this._cache, this._path, id, type, address)
	}
	content_exports(id) {
		return new content_exports(this._cache, this._path, id)
	}
	content_migrations(id) {
		return new content_migrations(this._cache, this._path, id)
	}
	content_shares(id) {
		return new content_shares(this._cache, this._path, id)
	}
	progress(id) {
		return new progress(this._cache, this._path, id)
	}
	enrollments(id) {
		return new enrollments(this._cache, this._path, id)
	}
	last_attended() {
		return new last_attended(this._cache, this._path)
	}
	eportfolios(id) {
		return new eportfolios(this._cache, this._path, id)
	}
	features() {
		return new features(this._cache, this._path)
	}
	files(id) {
		return new files(this._cache, this._path, id)
	}
	folders(id) {
		return new folders(this._cache, this._path, id)
	}
	usage_rights() {
		return new usage_rights(this._cache, this._path)
	}
	content_licenses() {
		return new content_licenses(this._cache, this._path)
	}
	history() {
		return new history(this._cache, this._path)
	}
	logins(id) {
		return new logins(this._cache, this._path, id)
	}
	reset_password() {
		return new reset_password(this._cache, this._path)
	}
	planner() {
		return new planner(this._cache, this._path)
	}
	tabs(id) {
		return new tabs(this._cache, this._path, id)
	}
	observees(id) {
		return new observees(this._cache, this._path, id)
	}
	observers(id) {
		return new observers(this._cache, this._path, id)
	}
	observer_pairing_codes() {
		return new observer_pairing_codes(this._cache, this._path)
	}
	activity_stream(id) {
		return new activity_stream(this._cache, this._path, id)
	}
	missing_submissions() {
		return new missing_submissions(this._cache, this._path)
	}
	settings() {
		return new settings(this._cache, this._path)
	}
	colors(asset_string) {
		return new colors(this._cache, this._path, asset_string)
	}
	dashboard_positions() {
		return new dashboard_positions(this._cache, this._path)
	}
	sessions() {
		return new sessions(this._cache, this._path)
	}
	merge_into(id) {
		return new merge_into(this._cache, this._path, id)
	}
	split() {
		return new split(this._cache, this._path)
	}
	graded_submissions() {
		return new graded_submissions(this._cache, this._path)
	}
	profile() {
		return new profile(this._cache, this._path)
	}
	avatars() {
		return new avatars(this._cache, this._path)
	}
	page_views() {
		return new page_views(this._cache, this._path)
	}
	custom_data() {
		return new custom_data(this._cache, this._path)
	}
	async delete({headers} = {}) {
		return CanvasAPI.delete(this._path, { method: 'DELETE', headers }, this._cache)
	}
	async get({registration_status, start_time, end_time, search_term, sort, enrollment_type, enrollment_role, enrollment_role_id, include, user_id, user_ids, enrollment_state, unassigned, exclude_inactive, order, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
	async put({workflow_state, moderator, user, pseudonym, communication_channel, force_validations, enable_sis_reactivation, destination, initial_enrollment_type, pairing_code, override_sis_stickiness, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.put(this._path, { method: 'PUT', body: api_body, headers }, this._cache)
	}
	async post({workflow_state, moderator, user, pseudonym, communication_channel, force_validations, enable_sis_reactivation, destination, initial_enrollment_type, pairing_code, override_sis_stickiness, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class v1 extends base {
	constructor(cache, path) {
		super(cache, `${path}/v1`);
	}
	account_calendars(id) {
		return new account_calendars(this._cache, this._path, id)
	}
	accounts(id) {
		return new accounts(this._cache, this._path, id)
	}
	manageable_accounts() {
		return new manageable_accounts(this._cache, this._path)
	}
	course_accounts() {
		return new course_accounts(this._cache, this._path)
	}
	manually_created_courses_account() {
		return new manually_created_courses_account(this._cache, this._path)
	}
	courses(id) {
		return new courses(this._cache, this._path, id)
	}
	groups(id) {
		return new groups(this._cache, this._path, id)
	}
	announcements() {
		return new announcements(this._cache, this._path)
	}
	appointment_groups(id) {
		return new appointment_groups(this._cache, this._path, id)
	}
	users(id) {
		return new users(this._cache, this._path, id)
	}
	sections(id) {
		return new sections(this._cache, this._path, id)
	}
	audit() {
		return new audit(this._cache, this._path)
	}
	brand_variables() {
		return new brand_variables(this._cache, this._path)
	}
	calendar_events(id) {
		return new calendar_events(this._cache, this._path, id)
	}
	collaborations(id) {
		return new collaborations(this._cache, this._path, id)
	}
	comm_messages() {
		return new comm_messages(this._cache, this._path)
	}
	conferences() {
		return new conferences(this._cache, this._path)
	}
	conversations(id) {
		return new conversations(this._cache, this._path, id)
	}
	eportfolios(id) {
		return new eportfolios(this._cache, this._path, id)
	}
	epub_exports(id) {
		return new epub_exports(this._cache, this._path, id)
	}
	error_reports() {
		return new error_reports(this._cache, this._path)
	}
	external_tools(id) {
		return new external_tools(this._cache, this._path, id)
	}
	features() {
		return new features(this._cache, this._path)
	}
	folders(id) {
		return new folders(this._cache, this._path, id)
	}
	files(id) {
		return new files(this._cache, this._path, id)
	}
	grading_period_sets(id) {
		return new grading_period_sets(this._cache, this._path, id)
	}
	group_categories(id) {
		return new group_categories(this._cache, this._path, id)
	}
	inst_access_tokens() {
		return new inst_access_tokens(this._cache, this._path)
	}
	jwts() {
		return new jwts(this._cache, this._path)
	}
	media_objects(id) {
		return new media_objects(this._cache, this._path, id)
	}
	media_attachments(id) {
		return new media_attachments(this._cache, this._path, id)
	}
	global() {
		return new global(this._cache, this._path)
	}
	outcomes(id) {
		return new outcomes(this._cache, this._path, id)
	}
	planner() {
		return new planner(this._cache, this._path)
	}
	planner_notes(id) {
		return new planner_notes(this._cache, this._path, id)
	}
	polls(id) {
		return new polls(this._cache, this._path, id)
	}
	poll_sessions(id) {
		return new poll_sessions(this._cache, this._path, id)
	}
	progress(id) {
		return new progress(this._cache, this._path, id)
	}
	quiz_submissions(id) {
		return new quiz_submissions(this._cache, this._path, id)
	}
	search() {
		return new search(this._cache, this._path)
	}
	services() {
		return new services(this._cache, this._path)
	}
	shared_brand_configs(id) {
		return new shared_brand_configs(this._cache, this._path, id)
	}
}

class validate_access_code extends base {
	constructor(cache, path) {
		super(cache, `${path}/validate_access_code`);
	}
	async post({access_code, headers} = {}) {
		const api_body = arguments[0] || {};  
		delete api_body.headers; 
		return CanvasAPI.post(this._path, { method: 'POST', body: api_body, headers }, this._cache)
	}
}

class view extends base {
	constructor(cache, path) {
		super(cache, `${path}/view`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class visible_calendars_count extends base {
	constructor(cache, path) {
		super(cache, `${path}/visible_calendars_count`);
	}
	async get({page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class visible_course_nav_tools extends base {
	constructor(cache, path) {
		super(cache, `${path}/visible_course_nav_tools`);
	}
	async get({context_codes, page, per_page, max_pages, headers} = {}) {
		const api_query = arguments[0] || {};  
		delete api_query.headers; 
		return CanvasAPI.get(this._path, { method: 'GET', query: api_query, headers }, this._cache)
	}
}

class CanvasAPI extends base {  
	constructor(origin, cache) {  
		super(cache, new URL('api', origin).href); 
	} 
	v1() {  
		return new v1(this._cache, this._path)  
	}  
	static defaults = { headers: { } } 
}

async function getCache(cache, key) {
  if (cache) {
    if (cache.storage) {
      return JSON.parse(cache.storage.getItem(key))
    } else if (cache.redis) {
      return JSON.parse(await cache.redis.get(key))
    }
  }
  return null
}

async function setCache(cache, key, value) {
  if (cache) {
    if (cache.storage) {
      cache.storage.setItem(key, JSON.stringify(value));
    } else if (cache.redis) {
      if (isNaN(cache.ttl)) {
        await cache.redis.set(key, JSON.stringify(value));
      } else {
        await cache.redis.set(key, JSON.stringify(value), 'EX', Number(cache.ttl));
      }
    }
  }
}

function intoRels(acc, x) {
  function splitRel (rel) {
    acc[rel] = Object.assign(x, {rel: rel });
  }
  x.rel.split(/\s+/).forEach(splitRel);
  return acc;
}

function parseLink(link) {
  try {
    const m       =  link.match(/<?([^>]*)>(.*)/)
      , linkUrl   =  m[1]
      , parts     =  m[2].split(';')
      , parsedUrl =  new URL(linkUrl)
      , qry       =  Object.fromEntries(parsedUrl.searchParams);

    parts.shift();

    let info = parts
      .reduce((acc, p) => {
        // rel="next" => 1: rel 2: next
        var m = p.match(/\s*(.+)\s*=\s*"?([^"]+)"?/);
        if (m) acc[m[1]] = m[2];
        return acc;
      }, {});
    
    info = Object.assign({}, qry, info);
    info.url = linkUrl;
    return info;
  } catch (e) {
    return null;
  }
}

function parseLinkHeader(linkHeader) {
  if (!linkHeader) return false;
  return linkHeader.split(/,\s*</)
   .map(parseLink)
   .filter(x => x && x.rel)
   .reduce(intoRels, {});
}
function md5 ( str ) {

  let RotateLeft = function(lValue, iShiftBits) {
    return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
  };
  
  let AddUnsigned = function(lX,lY) {
    let lX4,lY4,lX8,lY8,lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
    if (lX4 & lY4) {
      return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      } else {
        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
      }
    } else {
      return (lResult ^ lX8 ^ lY8);
    }
  };
  
  let F = function(x,y,z) { return (x & y) | ((~x) & z); };
  let G = function(x,y,z) { return (x & z) | (y & (~z)); };
  let H = function(x,y,z) { return (x ^ y ^ z); };
  let I = function(x,y,z) { return (y ^ (x | (~z))); };
  
  let FF = function(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  };
  
  let GG = function(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  };
  
  let HH = function(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  };
  
  let II = function(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  };
  
  let ConvertToWordArray = function(str) {
    let lWordCount;
    let lMessageLength = str.length;
    let lNumberOfWords_temp1=lMessageLength + 8;
    let lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
    let lNumberOfWords = (lNumberOfWords_temp2+1)*16;
    let lWordArray=Array(lNumberOfWords-1);
    let lBytePosition = 0;
    let lByteCount = 0;
    while ( lByteCount < lMessageLength ) {
      lWordCount = (lByteCount-(lByteCount % 4))/4;
      lBytePosition = (lByteCount % 4)*8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount)<<lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount-(lByteCount % 4))/4;
    lBytePosition = (lByteCount % 4)*8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
    lWordArray[lNumberOfWords-2] = lMessageLength<<3;
    lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
    return lWordArray;
  };
  
  let WordToHex = function(lValue) {
    let WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
    for (lCount = 0;lCount<=3;lCount++) {
      lByte = (lValue>>>(lCount*8)) & 255;
      WordToHexValue_temp = "0" + lByte.toString(16);
      WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
    }
    return WordToHexValue;
  };
  
  let x=Array();
  let k,AA,BB,CC,DD,a,b,c,d;
  let S11=7, S12=12, S13=17, S14=22;
  let S21=5, S22=9 , S23=14, S24=20;
  let S31=4, S32=11, S33=16, S34=23;
  let S41=6, S42=10, S43=15, S44=21;
  
  str = encodeURIComponent(str);
  x = ConvertToWordArray(str);
  a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
  
  for (k=0;k<x.length;k+=16) {
    AA=a; BB=b; CC=c; DD=d;
    a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
    d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
    c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
    b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
    a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
    d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
    c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
    b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
    a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
    d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
    c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
    b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
    a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
    d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
    c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
    b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
    a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
    d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
    c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
    b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
    a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
    d=GG(d,a,b,c,x[k+10],S22,0x2441453);
    c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
    b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
    a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
    d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
    c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
    b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
    a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
    d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
    c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
    b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
    a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
    d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
    c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
    b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
    a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
    d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
    c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
    b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
    a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
    d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
    c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
    b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
    a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
    d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
    c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
    b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
    a=II(a,b,c,d,x[k+0], S41,0xF4292244);
    d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
    c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
    b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
    a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
    d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
    c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
    b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
    a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
    d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
    c=II(c,d,a,b,x[k+6], S43,0xA3014314);
    b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
    a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
    d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
    c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
    b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
    a=AddUnsigned(a,AA);
    b=AddUnsigned(b,BB);
    c=AddUnsigned(c,CC);
    d=AddUnsigned(d,DD);
  }
  
  let temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
  
  return temp.toLowerCase();
}

CanvasAPI.get = async function(url, options, cache) { 
  let max_pages = 1;
  let next = new URL(url);  
  if (options.query) {  
    for (const [name, value] of Object.entries(options.query)) {  
      if (Array.isArray(value)) {
        for(let v of value) {
          next.searchParams.append(`${name}[]`, v); 
        }
      } else if (name == 'max_pages') {
        max_pages = isNaN(value) ? 1 : Number(value);
        next.searchParams.set(name, value); 
      } else { 
        next.searchParams.set(name, value); 
      } 
    }  
    delete options.query;  
  }
  options.headers = Object.assign({ accept: 'application/json, text/html, text/plain, */*'}, 
                                    CanvasAPI.defaults.headers, options.headers ); 
  let cacheKey = null;
  let result = undefined;
  let res = {
    ok: true, 
    url: next.toString(),
    status: 200,
    statusText: 'OK',
  };
  // get from cache
  if (cache) {
    cacheKey = `canvasapi-${md5(url.toString())}`;
    result = await getCache(cache, cacheKey);
  }
  if (!result) {
    // need for cache key but remove before fetching
    next.searchParams.delete('max_pages');

    while(next && max_pages > 0) {
      res = await CanvasAPI.fetch(next, options);
      max_pages--;
      if (res.ok) {
        const links = parseLinkHeader(res.headers.get('link'));
        next = links && links.next ? links.next.url : null;
        const data = await res.json();
        if (Array.isArray(data)) {
          if (!result) result= data; 
          else result.push.apply(result, data);
        } else {
          if (!result && !next) {
            result = data;
          } else {
            result.push(data);
          }
        }        
      } else {
        next = null;
      }
    }

    // save to cache
    if (cache && cacheKey) {
      await setCache(cache, cacheKey, result);
    }  
  } else {
    res.cache = true;
  }
  return {
    ok: res.ok, 
    url: res.url,
    status: res.status,
    statusText: res.statusText,
    headers: res.headers,
    cache: res.cache||false,
    data: result
  }    
};

CanvasAPI.delete = async function(url, options) { 
  return CanvasAPI.fetch(url, options)
};

async function putPostPatch(url, options) {
  options.headers = Object.assign({ accept: 'application/json, text/html, text/plain, */*'}, 
                                    CanvasAPI.defaults.headers, options.headers );
  if (typeof options.body === 'object') { 
    options.body = JSON.stringify(options.body); 
    options.headers['content-type'] = 'application/json; charset=utf8;';  
  } 
  return CanvasAPI.fetch(url, options)
}

CanvasAPI.put = putPostPatch;
CanvasAPI.post = putPostPatch;
CanvasAPI.patch = putPostPatch;

CanvasAPI.fetch = fetch;

export { CanvasAPI as default };
