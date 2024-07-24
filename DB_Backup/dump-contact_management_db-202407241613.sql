PGDMP                         |            contact_management_db    14.12 (Homebrew)    14.12 (Homebrew) %    h           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            i           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            j           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            k           1262    16432    contact_management_db    DATABASE     `   CREATE DATABASE contact_management_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';
 %   DROP DATABASE contact_management_db;
                germanbassano    false                        2615    16888    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                germanbassano    false            �            1259    16911    Contact    TABLE     j  CREATE TABLE public."Contact" (
    id integer NOT NULL,
    name text NOT NULL,
    address text NOT NULL,
    email text NOT NULL,
    cellphone text NOT NULL,
    "profilePicture" text,
    "userId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Contact";
       public         heap    germanbassano    false    4            �            1259    16910    Contact_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Contact_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Contact_id_seq";
       public          germanbassano    false    213    4            l           0    0    Contact_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Contact_id_seq" OWNED BY public."Contact".id;
          public          germanbassano    false    212            �            1259    16929    Login    TABLE     �   CREATE TABLE public."Login" (
    id uuid NOT NULL,
    "userId" integer NOT NULL,
    "timestamp" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    token text
);
    DROP TABLE public."Login";
       public         heap    germanbassano    false    4            �            1259    16921    Note    TABLE     �   CREATE TABLE public."Note" (
    id integer NOT NULL,
    text text NOT NULL,
    "contactId" integer NOT NULL,
    "userId" integer NOT NULL
);
    DROP TABLE public."Note";
       public         heap    germanbassano    false    4            �            1259    16920    Note_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Note_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Note_id_seq";
       public          germanbassano    false    215    4            m           0    0    Note_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Note_id_seq" OWNED BY public."Note".id;
          public          germanbassano    false    214            �            1259    16901    User    TABLE     �   CREATE TABLE public."User" (
    id integer NOT NULL,
    name text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."User";
       public         heap    germanbassano    false    4            �            1259    16900    User_id_seq    SEQUENCE     �   CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."User_id_seq";
       public          germanbassano    false    211    4            n           0    0    User_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;
          public          germanbassano    false    210            �            1259    16889    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    germanbassano    false    4            �           2604    16914 
   Contact id    DEFAULT     l   ALTER TABLE ONLY public."Contact" ALTER COLUMN id SET DEFAULT nextval('public."Contact_id_seq"'::regclass);
 ;   ALTER TABLE public."Contact" ALTER COLUMN id DROP DEFAULT;
       public          germanbassano    false    213    212    213            �           2604    16924    Note id    DEFAULT     f   ALTER TABLE ONLY public."Note" ALTER COLUMN id SET DEFAULT nextval('public."Note_id_seq"'::regclass);
 8   ALTER TABLE public."Note" ALTER COLUMN id DROP DEFAULT;
       public          germanbassano    false    214    215    215            �           2604    16904    User id    DEFAULT     f   ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);
 8   ALTER TABLE public."User" ALTER COLUMN id DROP DEFAULT;
       public          germanbassano    false    211    210    211            b          0    16911    Contact 
   TABLE DATA           ~   COPY public."Contact" (id, name, address, email, cellphone, "profilePicture", "userId", "createdAt", "updatedAt") FROM stdin;
    public          germanbassano    false    213   �+       e          0    16929    Login 
   TABLE DATA           C   COPY public."Login" (id, "userId", "timestamp", token) FROM stdin;
    public          germanbassano    false    216   �+       d          0    16921    Note 
   TABLE DATA           A   COPY public."Note" (id, text, "contactId", "userId") FROM stdin;
    public          germanbassano    false    215   �,       `          0    16901    User 
   TABLE DATA           N   COPY public."User" (id, name, password, "createdAt", "updatedAt") FROM stdin;
    public          germanbassano    false    211   -       ^          0    16889    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          germanbassano    false    209   �-       o           0    0    Contact_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Contact_id_seq"', 1, false);
          public          germanbassano    false    212            p           0    0    Note_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Note_id_seq"', 1, false);
          public          germanbassano    false    214            q           0    0    User_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."User_id_seq"', 1, false);
          public          germanbassano    false    210            �           2606    16919    Contact Contact_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Contact"
    ADD CONSTRAINT "Contact_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Contact" DROP CONSTRAINT "Contact_pkey";
       public            germanbassano    false    213            �           2606    16936    Login Login_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Login"
    ADD CONSTRAINT "Login_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Login" DROP CONSTRAINT "Login_pkey";
       public            germanbassano    false    216            �           2606    16928    Note Note_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Note"
    ADD CONSTRAINT "Note_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Note" DROP CONSTRAINT "Note_pkey";
       public            germanbassano    false    215            �           2606    16909    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            germanbassano    false    211            �           2606    16897 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            germanbassano    false    209            �           1259    16937    User_name_key    INDEX     I   CREATE UNIQUE INDEX "User_name_key" ON public."User" USING btree (name);
 #   DROP INDEX public."User_name_key";
       public            germanbassano    false    211            �           2606    16938    Contact Contact_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Contact"
    ADD CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Contact" DROP CONSTRAINT "Contact_userId_fkey";
       public          germanbassano    false    213    3528    211            �           2606    16953    Login Login_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Login"
    ADD CONSTRAINT "Login_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public."Login" DROP CONSTRAINT "Login_userId_fkey";
       public          germanbassano    false    3528    216    211            �           2606    16943    Note Note_contactId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Note"
    ADD CONSTRAINT "Note_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES public."Contact"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public."Note" DROP CONSTRAINT "Note_contactId_fkey";
       public          germanbassano    false    3530    215    213            �           2606    16948    Note Note_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Note"
    ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 C   ALTER TABLE ONLY public."Note" DROP CONSTRAINT "Note_userId_fkey";
       public          germanbassano    false    211    215    3528            b      x������ � �      e     x��ϻ��0 @�Z�b LHB�vE%����Bx�>fqT�z�����mN�1+J����p]�s�x�	�6�&b@���[&�=,�b�ڨ]��)P؊^��DM�K�N��'�p:l�quA/��M9�TC kz��v�5wѝ�S<"/�")�Ul�s���8c�[��座�fW�~(��S9����g�Qp�h�[����ܩ���l唚�M�]�]LM��p"o���;'�C#'�K�������˗�|زUtPu�r�杞����$Əi�ē~v      d      x������ � �      `   q   x�3�����Sp�O��H,�HM�/H,..�/J�4202�50�52Q04�20�26�332�%�e��T���⟗�����F�abe`�gi�C�˘�=�(71J��!=��\1z\\\ [3      ^   �   x�m�[
1F��U��ʟ4MZ�
I�F����<��38�.iT�$V�:M}psF�e�"�9�D:��ʾ��hdG�t�SP,J�1D*��7�`�,	�X6Tv�.۶R���c�
d;�z����Z��t�������A�a;��c2�     