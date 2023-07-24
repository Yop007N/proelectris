--
-- PostgreSQL database cluster dump
--

-- Started on 2023-07-24 10:00:30

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;






--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 12.15 (Debian 12.15-1.pgdg110+1)
-- Dumped by pg_dump version 14.2

-- Started on 2023-07-24 10:00:30

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2023-07-24 10:00:30

--
-- PostgreSQL database dump complete
--

--
-- Database "proelectris" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 12.15 (Debian 12.15-1.pgdg110+1)
-- Dumped by pg_dump version 14.2

-- Started on 2023-07-24 10:00:30

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2992 (class 1262 OID 106587)
-- Name: proelectris; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE proelectris WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE proelectris OWNER TO postgres;

\connect proelectris

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 207 (class 1259 OID 106609)
-- Name: cliente_producto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cliente_producto (
    id integer NOT NULL,
    cliente_id integer,
    producto_id integer
);


ALTER TABLE public.cliente_producto OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 106607)
-- Name: cliente_producto_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cliente_producto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cliente_producto_id_seq OWNER TO postgres;

--
-- TOC entry 2993 (class 0 OID 0)
-- Dependencies: 206
-- Name: cliente_producto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cliente_producto_id_seq OWNED BY public.cliente_producto.id;


--
-- TOC entry 203 (class 1259 OID 106590)
-- Name: clientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clientes (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    direccion character varying(200) NOT NULL,
    telefono character varying(20),
    email character varying(100),
    ruc character varying(20) NOT NULL,
    ci character varying(20) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.clientes OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 106588)
-- Name: clientes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clientes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clientes_id_seq OWNER TO postgres;

--
-- TOC entry 2994 (class 0 OID 0)
-- Dependencies: 202
-- Name: clientes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clientes_id_seq OWNED BY public.clientes.id;


--
-- TOC entry 205 (class 1259 OID 106598)
-- Name: productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productos (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text,
    codigo character varying(20) NOT NULL,
    precio numeric(10,2) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.productos OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 106596)
-- Name: productos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.productos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.productos_id_seq OWNER TO postgres;

--
-- TOC entry 2995 (class 0 OID 0)
-- Dependencies: 204
-- Name: productos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.productos_id_seq OWNED BY public.productos.id;


--
-- TOC entry 2846 (class 2604 OID 106612)
-- Name: cliente_producto id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente_producto ALTER COLUMN id SET DEFAULT nextval('public.cliente_producto_id_seq'::regclass);


--
-- TOC entry 2840 (class 2604 OID 106593)
-- Name: clientes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes ALTER COLUMN id SET DEFAULT nextval('public.clientes_id_seq'::regclass);


--
-- TOC entry 2843 (class 2604 OID 106601)
-- Name: productos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos ALTER COLUMN id SET DEFAULT nextval('public.productos_id_seq'::regclass);


--
-- TOC entry 2986 (class 0 OID 106609)
-- Dependencies: 207
-- Data for Name: cliente_producto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cliente_producto (id, cliente_id, producto_id) FROM stdin;
\.


--
-- TOC entry 2982 (class 0 OID 106590)
-- Dependencies: 203
-- Data for Name: clientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clientes (id, nombre, direccion, telefono, email, ruc, ci, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 2984 (class 0 OID 106598)
-- Dependencies: 205
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productos (id, nombre, descripcion, codigo, precio, "createdAt", "updatedAt") FROM stdin;
1	Producto 1	Descripción del Producto 1	12345	100.00	2023-07-23 11:29:51.455074	2023-07-23 11:29:51.455074
2	Producto 2	Descripción del Producto 2	67890	200.00	2023-07-23 11:29:51.455074	2023-07-23 11:29:51.455074
3	Producto 3	Descripción del Producto 3	54321	150.00	2023-07-23 11:29:51.455074	2023-07-23 11:29:51.455074
4	Producto 4	Descripción del Producto 4	98765	300.00	2023-07-23 11:29:51.455074	2023-07-23 11:29:51.455074
5	Producto 5	Descripción del Producto 5	45678	250.00	2023-07-23 11:29:51.455074	2023-07-23 11:29:51.455074
6	Producto 6	Descripción del Producto 6	13579	180.00	2023-07-23 11:29:51.455074	2023-07-23 11:29:51.455074
7	Producto 7	Descripción del Producto 7	24680	220.00	2023-07-23 11:29:51.455074	2023-07-23 11:29:51.455074
8	Producto 8	Descripción del Producto 8	97531	270.00	2023-07-23 11:29:51.455074	2023-07-23 11:29:51.455074
9	Producto 9	Descripción del Producto 9	86420	190.00	2023-07-23 11:29:51.455074	2023-07-23 11:29:51.455074
10	Producto 10	Descripción del Producto 10	11223	120.00	2023-07-23 11:29:51.455074	2023-07-23 11:29:51.455074
11	Nuevo Producto	Descripción del nuevo producto	12345	99.99	2023-07-23 16:37:15.527	2023-07-23 16:37:15.527
\.


--
-- TOC entry 2996 (class 0 OID 0)
-- Dependencies: 206
-- Name: cliente_producto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cliente_producto_id_seq', 10, true);


--
-- TOC entry 2997 (class 0 OID 0)
-- Dependencies: 202
-- Name: clientes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clientes_id_seq', 14, true);


--
-- TOC entry 2998 (class 0 OID 0)
-- Dependencies: 204
-- Name: productos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.productos_id_seq', 11, true);


--
-- TOC entry 2852 (class 2606 OID 106614)
-- Name: cliente_producto cliente_producto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente_producto
    ADD CONSTRAINT cliente_producto_pkey PRIMARY KEY (id);


--
-- TOC entry 2848 (class 2606 OID 106595)
-- Name: clientes clientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (id);


--
-- TOC entry 2850 (class 2606 OID 106606)
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);


--
-- TOC entry 2853 (class 2606 OID 106615)
-- Name: cliente_producto cliente_producto_cliente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente_producto
    ADD CONSTRAINT cliente_producto_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.clientes(id) ON DELETE CASCADE;


--
-- TOC entry 2854 (class 2606 OID 106620)
-- Name: cliente_producto cliente_producto_producto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente_producto
    ADD CONSTRAINT cliente_producto_producto_id_fkey FOREIGN KEY (producto_id) REFERENCES public.productos(id) ON DELETE CASCADE;


-- Completed on 2023-07-24 10:00:30

--
-- PostgreSQL database dump complete
--

-- Completed on 2023-07-24 10:00:30

--
-- PostgreSQL database cluster dump complete
--

