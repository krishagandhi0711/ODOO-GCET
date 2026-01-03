--
-- PostgreSQL database dump
--

\restrict 84NVMY927eIdNRjPp8nioGaNgvlyWoOmpghzAhYBqUNdQ9rZmMaoPIMiKld6mJ8

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

-- Started on 2026-01-03 09:59:45

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 875 (class 1247 OID 17180)
-- Name: attendance_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.attendance_status AS ENUM (
    'PRESENT',
    'ABSENT',
    'LEAVE',
    'HALF_DAY'
);


ALTER TYPE public.attendance_status OWNER TO postgres;

--
-- TOC entry 878 (class 1247 OID 17190)
-- Name: leave_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.leave_status AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);


ALTER TYPE public.leave_status OWNER TO postgres;

--
-- TOC entry 881 (class 1247 OID 17198)
-- Name: leave_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.leave_type AS ENUM (
    'PAID',
    'SICK',
    'UNPAID'
);


ALTER TYPE public.leave_type OWNER TO postgres;

--
-- TOC entry 872 (class 1247 OID 17172)
-- Name: role_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.role_type AS ENUM (
    'ADMIN',
    'HR',
    'EMPLOYEE'
);


ALTER TYPE public.role_type OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 228 (class 1259 OID 17291)
-- Name: attendance_records; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attendance_records (
    id integer NOT NULL,
    employee_id integer,
    attendance_date date NOT NULL,
    check_in timestamp without time zone,
    check_out timestamp without time zone,
    total_hours numeric(5,2),
    extra_hours numeric(5,2) DEFAULT 0,
    status public.attendance_status DEFAULT 'ABSENT'::public.attendance_status
);


ALTER TABLE public.attendance_records OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 17290)
-- Name: attendance_records_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.attendance_records_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.attendance_records_id_seq OWNER TO postgres;

--
-- TOC entry 5160 (class 0 OID 0)
-- Dependencies: 227
-- Name: attendance_records_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.attendance_records_id_seq OWNED BY public.attendance_records.id;


--
-- TOC entry 220 (class 1259 OID 17206)
-- Name: companies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.companies (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    prefix character varying(10) NOT NULL,
    logo_url text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.companies OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 17205)
-- Name: companies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.companies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.companies_id_seq OWNER TO postgres;

--
-- TOC entry 5161 (class 0 OID 0)
-- Dependencies: 219
-- Name: companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.companies_id_seq OWNED BY public.companies.id;


--
-- TOC entry 239 (class 1259 OID 17382)
-- Name: employee_documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee_documents (
    id integer NOT NULL,
    employee_id integer,
    document_type character varying(50),
    document_url text
);


ALTER TABLE public.employee_documents OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 17381)
-- Name: employee_documents_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employee_documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employee_documents_id_seq OWNER TO postgres;

--
-- TOC entry 5162 (class 0 OID 0)
-- Dependencies: 238
-- Name: employee_documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employee_documents_id_seq OWNED BY public.employee_documents.id;


--
-- TOC entry 237 (class 1259 OID 17369)
-- Name: employee_skills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee_skills (
    id integer NOT NULL,
    employee_id integer,
    skill_name character varying(100),
    certification character varying(150)
);


ALTER TABLE public.employee_skills OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 17368)
-- Name: employee_skills_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employee_skills_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employee_skills_id_seq OWNER TO postgres;

--
-- TOC entry 5163 (class 0 OID 0)
-- Dependencies: 236
-- Name: employee_skills_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employee_skills_id_seq OWNED BY public.employee_skills.id;


--
-- TOC entry 226 (class 1259 OID 17261)
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    id integer NOT NULL,
    user_id integer,
    company_id integer,
    full_name character varying(150),
    mobile character varying(15),
    department character varying(100),
    manager_id integer,
    location character varying(100),
    dob date,
    address text,
    nationality character varying(50),
    marital_status character varying(20),
    job_position character varying(100),
    date_of_joining date,
    employee_code character varying(30),
    pan_no character varying(20),
    uan_no character varying(20),
    about text,
    love_about_job text,
    interests text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 17260)
-- Name: employees_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employees_id_seq OWNER TO postgres;

--
-- TOC entry 5164 (class 0 OID 0)
-- Dependencies: 225
-- Name: employees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employees_id_seq OWNED BY public.employees.id;


--
-- TOC entry 231 (class 1259 OID 17325)
-- Name: leave_balances; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leave_balances (
    employee_id integer NOT NULL,
    leave_type public.leave_type NOT NULL,
    total_days integer,
    used_days integer DEFAULT 0
);


ALTER TABLE public.leave_balances OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 17309)
-- Name: leave_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leave_requests (
    id integer NOT NULL,
    employee_id integer,
    leave_type public.leave_type,
    start_date date,
    end_date date,
    reason text,
    status public.leave_status DEFAULT 'PENDING'::public.leave_status,
    applied_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.leave_requests OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 17308)
-- Name: leave_requests_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.leave_requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.leave_requests_id_seq OWNER TO postgres;

--
-- TOC entry 5165 (class 0 OID 0)
-- Dependencies: 229
-- Name: leave_requests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.leave_requests_id_seq OWNED BY public.leave_requests.id;


--
-- TOC entry 222 (class 1259 OID 17221)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name public.role_type NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 17220)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO postgres;

--
-- TOC entry 5166 (class 0 OID 0)
-- Dependencies: 221
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 235 (class 1259 OID 17356)
-- Name: salary_components; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.salary_components (
    id integer NOT NULL,
    salary_structure_id integer,
    basic numeric(10,2),
    hra numeric(10,2),
    standard_allowance numeric(10,2),
    performance_bonus_percent numeric(5,2),
    lta_percent numeric(5,2),
    pf_employee_percent numeric(5,2),
    pf_employer_percent numeric(5,2),
    professional_tax numeric(10,2)
);


ALTER TABLE public.salary_components OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 17355)
-- Name: salary_components_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.salary_components_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.salary_components_id_seq OWNER TO postgres;

--
-- TOC entry 5167 (class 0 OID 0)
-- Dependencies: 234
-- Name: salary_components_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.salary_components_id_seq OWNED BY public.salary_components.id;


--
-- TOC entry 233 (class 1259 OID 17339)
-- Name: salary_structures; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.salary_structures (
    id integer NOT NULL,
    employee_id integer,
    monthly_wage numeric(10,2) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.salary_structures OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 17338)
-- Name: salary_structures_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.salary_structures_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.salary_structures_id_seq OWNER TO postgres;

--
-- TOC entry 5168 (class 0 OID 0)
-- Dependencies: 232
-- Name: salary_structures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.salary_structures_id_seq OWNED BY public.salary_structures.id;


--
-- TOC entry 224 (class 1259 OID 17232)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    company_id integer,
    role_id integer,
    login_id character varying(30) NOT NULL,
    email character varying(150) NOT NULL,
    password text NOT NULL,
    is_first_login boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 17231)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5169 (class 0 OID 0)
-- Dependencies: 223
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4925 (class 2604 OID 17294)
-- Name: attendance_records id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance_records ALTER COLUMN id SET DEFAULT nextval('public.attendance_records_id_seq'::regclass);


--
-- TOC entry 4917 (class 2604 OID 17209)
-- Name: companies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies ALTER COLUMN id SET DEFAULT nextval('public.companies_id_seq'::regclass);


--
-- TOC entry 4936 (class 2604 OID 17385)
-- Name: employee_documents id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_documents ALTER COLUMN id SET DEFAULT nextval('public.employee_documents_id_seq'::regclass);


--
-- TOC entry 4935 (class 2604 OID 17372)
-- Name: employee_skills id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_skills ALTER COLUMN id SET DEFAULT nextval('public.employee_skills_id_seq'::regclass);


--
-- TOC entry 4923 (class 2604 OID 17264)
-- Name: employees id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees ALTER COLUMN id SET DEFAULT nextval('public.employees_id_seq'::regclass);


--
-- TOC entry 4928 (class 2604 OID 17312)
-- Name: leave_requests id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leave_requests ALTER COLUMN id SET DEFAULT nextval('public.leave_requests_id_seq'::regclass);


--
-- TOC entry 4919 (class 2604 OID 17224)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 4934 (class 2604 OID 17359)
-- Name: salary_components id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salary_components ALTER COLUMN id SET DEFAULT nextval('public.salary_components_id_seq'::regclass);


--
-- TOC entry 4932 (class 2604 OID 17342)
-- Name: salary_structures id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salary_structures ALTER COLUMN id SET DEFAULT nextval('public.salary_structures_id_seq'::regclass);


--
-- TOC entry 4920 (class 2604 OID 17235)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5143 (class 0 OID 17291)
-- Dependencies: 228
-- Data for Name: attendance_records; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.attendance_records (id, employee_id, attendance_date, check_in, check_out, total_hours, extra_hours, status) FROM stdin;
\.


--
-- TOC entry 5135 (class 0 OID 17206)
-- Dependencies: 220
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.companies (id, name, prefix, logo_url, created_at) FROM stdin;
\.


--
-- TOC entry 5154 (class 0 OID 17382)
-- Dependencies: 239
-- Data for Name: employee_documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employee_documents (id, employee_id, document_type, document_url) FROM stdin;
\.


--
-- TOC entry 5152 (class 0 OID 17369)
-- Dependencies: 237
-- Data for Name: employee_skills; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employee_skills (id, employee_id, skill_name, certification) FROM stdin;
\.


--
-- TOC entry 5141 (class 0 OID 17261)
-- Dependencies: 226
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees (id, user_id, company_id, full_name, mobile, department, manager_id, location, dob, address, nationality, marital_status, job_position, date_of_joining, employee_code, pan_no, uan_no, about, love_about_job, interests, created_at) FROM stdin;
\.


--
-- TOC entry 5146 (class 0 OID 17325)
-- Dependencies: 231
-- Data for Name: leave_balances; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.leave_balances (employee_id, leave_type, total_days, used_days) FROM stdin;
\.


--
-- TOC entry 5145 (class 0 OID 17309)
-- Dependencies: 230
-- Data for Name: leave_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.leave_requests (id, employee_id, leave_type, start_date, end_date, reason, status, applied_at) FROM stdin;
\.


--
-- TOC entry 5137 (class 0 OID 17221)
-- Dependencies: 222
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name) FROM stdin;
1	ADMIN
2	HR
3	EMPLOYEE
\.


--
-- TOC entry 5150 (class 0 OID 17356)
-- Dependencies: 235
-- Data for Name: salary_components; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.salary_components (id, salary_structure_id, basic, hra, standard_allowance, performance_bonus_percent, lta_percent, pf_employee_percent, pf_employer_percent, professional_tax) FROM stdin;
\.


--
-- TOC entry 5148 (class 0 OID 17339)
-- Dependencies: 233
-- Data for Name: salary_structures; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.salary_structures (id, employee_id, monthly_wage, created_at) FROM stdin;
\.


--
-- TOC entry 5139 (class 0 OID 17232)
-- Dependencies: 224
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, company_id, role_id, login_id, email, password, is_first_login, created_at) FROM stdin;
\.


--
-- TOC entry 5170 (class 0 OID 0)
-- Dependencies: 227
-- Name: attendance_records_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.attendance_records_id_seq', 1, false);


--
-- TOC entry 5171 (class 0 OID 0)
-- Dependencies: 219
-- Name: companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.companies_id_seq', 1, false);


--
-- TOC entry 5172 (class 0 OID 0)
-- Dependencies: 238
-- Name: employee_documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employee_documents_id_seq', 1, false);


--
-- TOC entry 5173 (class 0 OID 0)
-- Dependencies: 236
-- Name: employee_skills_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employee_skills_id_seq', 1, false);


--
-- TOC entry 5174 (class 0 OID 0)
-- Dependencies: 225
-- Name: employees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employees_id_seq', 1, false);


--
-- TOC entry 5175 (class 0 OID 0)
-- Dependencies: 229
-- Name: leave_requests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.leave_requests_id_seq', 1, false);


--
-- TOC entry 5176 (class 0 OID 0)
-- Dependencies: 221
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- TOC entry 5177 (class 0 OID 0)
-- Dependencies: 234
-- Name: salary_components_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.salary_components_id_seq', 1, false);


--
-- TOC entry 5178 (class 0 OID 0)
-- Dependencies: 232
-- Name: salary_structures_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.salary_structures_id_seq', 1, false);


--
-- TOC entry 5179 (class 0 OID 0)
-- Dependencies: 223
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- TOC entry 4958 (class 2606 OID 17302)
-- Name: attendance_records attendance_records_employee_id_attendance_date_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance_records
    ADD CONSTRAINT attendance_records_employee_id_attendance_date_key UNIQUE (employee_id, attendance_date);


--
-- TOC entry 4960 (class 2606 OID 17300)
-- Name: attendance_records attendance_records_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance_records
    ADD CONSTRAINT attendance_records_pkey PRIMARY KEY (id);


--
-- TOC entry 4938 (class 2606 OID 17217)
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- TOC entry 4940 (class 2606 OID 17219)
-- Name: companies companies_prefix_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_prefix_key UNIQUE (prefix);


--
-- TOC entry 4974 (class 2606 OID 17390)
-- Name: employee_documents employee_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_documents
    ADD CONSTRAINT employee_documents_pkey PRIMARY KEY (id);


--
-- TOC entry 4972 (class 2606 OID 17375)
-- Name: employee_skills employee_skills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_skills
    ADD CONSTRAINT employee_skills_pkey PRIMARY KEY (id);


--
-- TOC entry 4952 (class 2606 OID 17274)
-- Name: employees employees_employee_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_employee_code_key UNIQUE (employee_code);


--
-- TOC entry 4954 (class 2606 OID 17270)
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- TOC entry 4956 (class 2606 OID 17272)
-- Name: employees employees_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_user_id_key UNIQUE (user_id);


--
-- TOC entry 4964 (class 2606 OID 17332)
-- Name: leave_balances leave_balances_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leave_balances
    ADD CONSTRAINT leave_balances_pkey PRIMARY KEY (employee_id, leave_type);


--
-- TOC entry 4962 (class 2606 OID 17319)
-- Name: leave_requests leave_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leave_requests
    ADD CONSTRAINT leave_requests_pkey PRIMARY KEY (id);


--
-- TOC entry 4942 (class 2606 OID 17230)
-- Name: roles roles_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);


--
-- TOC entry 4944 (class 2606 OID 17228)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 4970 (class 2606 OID 17362)
-- Name: salary_components salary_components_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salary_components
    ADD CONSTRAINT salary_components_pkey PRIMARY KEY (id);


--
-- TOC entry 4966 (class 2606 OID 17349)
-- Name: salary_structures salary_structures_employee_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salary_structures
    ADD CONSTRAINT salary_structures_employee_id_key UNIQUE (employee_id);


--
-- TOC entry 4968 (class 2606 OID 17347)
-- Name: salary_structures salary_structures_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salary_structures
    ADD CONSTRAINT salary_structures_pkey PRIMARY KEY (id);


--
-- TOC entry 4946 (class 2606 OID 17249)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4948 (class 2606 OID 17247)
-- Name: users users_login_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_login_id_key UNIQUE (login_id);


--
-- TOC entry 4950 (class 2606 OID 17245)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4980 (class 2606 OID 17303)
-- Name: attendance_records attendance_records_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance_records
    ADD CONSTRAINT attendance_records_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(id);


--
-- TOC entry 4986 (class 2606 OID 17391)
-- Name: employee_documents employee_documents_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_documents
    ADD CONSTRAINT employee_documents_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(id);


--
-- TOC entry 4985 (class 2606 OID 17376)
-- Name: employee_skills employee_skills_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee_skills
    ADD CONSTRAINT employee_skills_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(id);


--
-- TOC entry 4977 (class 2606 OID 17280)
-- Name: employees employees_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(id);


--
-- TOC entry 4978 (class 2606 OID 17285)
-- Name: employees employees_manager_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_manager_id_fkey FOREIGN KEY (manager_id) REFERENCES public.employees(id);


--
-- TOC entry 4979 (class 2606 OID 17275)
-- Name: employees employees_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4982 (class 2606 OID 17333)
-- Name: leave_balances leave_balances_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leave_balances
    ADD CONSTRAINT leave_balances_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(id);


--
-- TOC entry 4981 (class 2606 OID 17320)
-- Name: leave_requests leave_requests_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leave_requests
    ADD CONSTRAINT leave_requests_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(id);


--
-- TOC entry 4984 (class 2606 OID 17363)
-- Name: salary_components salary_components_salary_structure_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salary_components
    ADD CONSTRAINT salary_components_salary_structure_id_fkey FOREIGN KEY (salary_structure_id) REFERENCES public.salary_structures(id);


--
-- TOC entry 4983 (class 2606 OID 17350)
-- Name: salary_structures salary_structures_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salary_structures
    ADD CONSTRAINT salary_structures_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(id);


--
-- TOC entry 4975 (class 2606 OID 17250)
-- Name: users users_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(id);


--
-- TOC entry 4976 (class 2606 OID 17255)
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);


-- Completed on 2026-01-03 09:59:46

--
-- PostgreSQL database dump complete
--

\unrestrict 84NVMY927eIdNRjPp8nioGaNgvlyWoOmpghzAhYBqUNdQ9rZmMaoPIMiKld6mJ8

