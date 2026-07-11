-- =========================================================
-- SCRIPT KHỞI TẠO CƠ SỞ DỮ LIỆU LÀNG NGHỀ (T-SQL / SQL Server)
-- =========================================================

-- 1. BẢNG NHÓM NGHỀ
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[NhomNghe]') AND type in (N'U'))
BEGIN
    CREATE TABLE NhomNghe (
        MaNhomNghe INT IDENTITY(1,1) PRIMARY KEY,
        TenNhomNghe NVARCHAR(100) NOT NULL UNIQUE,
        MaMauTag VARCHAR(20) NOT NULL,
        IconMinhHoa VARCHAR(100) NULL
    );
END
GO

-- 2. BẢNG LÀNG NGHỀ
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[LangNghe]') AND type in (N'U'))
BEGIN
    CREATE TABLE LangNghe (
        MaLangNghe INT IDENTITY(1,1) PRIMARY KEY,
        MaQuanLy INT NULL,
        MaNhomNghe INT NULL,
        TenLangNghe NVARCHAR(255) NOT NULL,
        DuongDanSlug VARCHAR(255) NOT NULL UNIQUE,
        TinhThanh NVARCHAR(100) NOT NULL,
        DiaChiCuThe NVARCHAR(500) NOT NULL,
        ViDo DECIMAL(10, 8) NOT NULL,
        KinhDo DECIMAL(11, 8) NOT NULL,
        LichSuHinhThanh NVARCHAR(MAX) NULL,
        GioiThieuNgan NVARCHAR(1000) NULL,
        AnhBia NVARCHAR(500) NOT NULL,
        DanhSachAnh NVARCHAR(MAX) NULL,
        DiemDanhGia DECIMAL(3, 2) DEFAULT 5.00,
        SoLuotDanhGia INT DEFAULT 0,
        TrangThai VARCHAR(50) DEFAULT 'HoatDong' CHECK (TrangThai IN ('HoatDong', 'ChoDuyet', 'An')),
        NgayTao DATETIME DEFAULT GETDATE(),
        CONSTRAINT FK_LangNghe_NhomNghe FOREIGN KEY (MaNhomNghe) REFERENCES NhomNghe(MaNhomNghe) ON DELETE SET NULL
    );
END
GO

-- 3. BẢNG NGHỆ NHÂN
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[NgheNhan]') AND type in (N'U'))
BEGIN
    CREATE TABLE NgheNhan (
        MaNgheNhan INT IDENTITY(1,1) PRIMARY KEY,
        MaLangNghe INT NOT NULL,
        HoTen NVARCHAR(150) NOT NULL,
        DanhHieu NVARCHAR(100) DEFAULT N'Thợ giỏi',
        AnhDaiDien NVARCHAR(500) NULL,
        SoNamKinhNghiem INT DEFAULT 1,
        SoTruong NVARCHAR(255) NULL,
        TieuSu NVARCHAR(MAX) NULL,
        CONSTRAINT FK_NgheNhan_LangNghe FOREIGN KEY (MaLangNghe) REFERENCES LangNghe(MaLangNghe) ON DELETE CASCADE
    );
END
GO

-- 4. BẢNG SẢN PHẨM
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SanPham]') AND type in (N'U'))
BEGIN
    CREATE TABLE SanPham (
        MaSanPham INT IDENTITY(1,1) PRIMARY KEY,
        MaLangNghe INT NOT NULL,
        MaNgheNhan INT NULL,
        TenSanPham NVARCHAR(255) NOT NULL,
        DuongDanSlug VARCHAR(255) NOT NULL UNIQUE,
        GiaBan DECIMAL(18, 2) NOT NULL,
        GiaKhuyenMai DECIMAL(18, 2) NULL,
        SoLuongTonKho INT DEFAULT 0,
        DanhSachAnh NVARCHAR(MAX) NOT NULL,
        ThongSoKyThuat NVARCHAR(MAX) NULL,
        SanPhamtieuBieu BIT DEFAULT 0,
        TrangThai VARCHAR(50) DEFAULT 'ConHang' CHECK (TrangThai IN ('ConHang', 'HetHang', 'NgungKinhDoanh')),
        CONSTRAINT FK_SanPham_LangNghe FOREIGN KEY (MaLangNghe) REFERENCES LangNghe(MaLangNghe) ON DELETE CASCADE,
        CONSTRAINT FK_SanPham_NgheNhan FOREIGN KEY (MaNgheNhan) REFERENCES NgheNhan(MaNgheNhan) ON DELETE SET NULL
    );
END
GO

-- 5. BẢNG THUYẾT MINH AUDIO
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ThuyetMinhAudio]') AND type in (N'U'))
BEGIN
    CREATE TABLE ThuyetMinhAudio (
        MaThuyetMinh INT IDENTITY(1,1) PRIMARY KEY,
        MaLangNghe INT NOT NULL,
        TieuDe NVARCHAR(255) NOT NULL,
        MaNgonNgu VARCHAR(10) NOT NULL,
        DuongDanAudio NVARCHAR(500) NOT NULL,
        ThoiLuongGiay INT NOT NULL,
        NoiDungVaniBan NVARCHAR(MAX) NULL,
        CONSTRAINT FK_ThuyetMinhAudio_LangNghe FOREIGN KEY (MaLangNghe) REFERENCES LangNghe(MaLangNghe) ON DELETE CASCADE
    );
END
GO

-- 6. BẢNG TOUR TRẢI NGHIỆM
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[TourTraiNghiem]') AND type in (N'U'))
BEGIN
    CREATE TABLE TourTraiNghiem (
        MaTour INT IDENTITY(1,1) PRIMARY KEY,
        MaLangNghe INT NOT NULL,
        MaNgheNhan INT NULL,
        TenTour NVARCHAR(255) NOT NULL,
        GiaVe DECIMAL(18, 2) NOT NULL,
        ThoiGianGio DECIMAL(4, 1) NOT NULL,
        SoKhachToiDa INT DEFAULT 20,
        LichTrinh NVARCHAR(255) NOT NULL,
        CONSTRAINT FK_TourTraiNghiem_LangNghe FOREIGN KEY (MaLangNghe) REFERENCES LangNghe(MaLangNghe) ON DELETE CASCADE
    );
END
GO

-- 7. BẢNG ĐÁNH GIÁ LÀNG NGHỀ
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[DanhGiaLangNghe]') AND type in (N'U'))
BEGIN
    CREATE TABLE DanhGiaLangNghe (
        MaDanhGia INT IDENTITY(1,1) PRIMARY KEY,
        MaLangNghe INT NOT NULL,
        MaNguoiDung INT NOT NULL,
        SoSao TINYINT NOT NULL CHECK (SoSao BETWEEN 1 AND 5),
        NhanXet NVARCHAR(MAX) NULL,
        AnhDinhKam NVARCHAR(MAX) NULL,
        NgayDanhGia DATETIME DEFAULT GETDATE(),
        CONSTRAINT FK_DanhGiaLangNghe_LangNghe FOREIGN KEY (MaLangNghe) REFERENCES LangNghe(MaLangNghe) ON DELETE CASCADE
    );
END
GO

-- =========================================================
-- DỮ LIỆU MẪU (DÀNH CHO BẢN ĐỒ VIETNAMMAP.JS)
-- =========================================================
IF NOT EXISTS (SELECT * FROM NhomNghe)
BEGIN
    INSERT INTO NhomNghe (TenNhomNghe, MaMauTag) VALUES 
    (N'Gốm sứ', '#c2410c'),
    (N'Dệt may', '#ca8a04'),
    (N'Mộc', '#65a30d'),
    (N'Đúc đồng', '#9a3412');
END
GO

IF NOT EXISTS (SELECT * FROM LangNghe)
BEGIN
    INSERT INTO LangNghe (MaNhomNghe, TenLangNghe, DuongDanSlug, TinhThanh, DiaChiCuThe, ViDo, KinhDo, GioiThieuNgan, AnhBia, DiemDanhGia) VALUES
    (1, N'Làng gốm Bát Tràng', 'lang-gom-bat-trang', N'Hà Nội', N'Xã Bát Tràng, Huyện Gia Lâm, Hà Nội', 20.9716, 105.9224, N'Làng nghề gốm sứ truyền thống với lịch sử hơn 700 năm.', 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=200', 4.80),
    (2, N'Làng lụa Vạn Phúc', 'lang-lua-van-phuc', N'Hà Nội', N'Phường Vạn Phúc, Quận Hà Đông, Hà Nội', 20.9754, 105.7709, N'Nơi dệt lụa tơ tằm mềm mại, trứ danh đất Hà Thành.', 'https://images.unsplash.com/photo-1584346762319-3c306d15d656?q=80&w=200', 4.70),
    (3, N'Làng mộc Kim Bồng', 'lang-moc-kim-bong', N'Quảng Nam', N'Xã Cẩm Kim, TP. Hội An, Quảng Nam', 15.8672, 108.3375, N'Nét chạm trổ gỗ tinh xảo gắn liền với kiến trúc phố cổ Hội An.', 'https://images.unsplash.com/photo-1605335198006-258dcb1f416c?q=80&w=200', 4.90),
    (4, N'Làng đúc đồng Đại Bái', 'lang-duc-dong-dai-bai', N'Bắc Ninh', N'Xã Đại Bái, Huyện Gia Bình, Bắc Ninh', 21.0833, 106.1667, N'Làng nghề kim khí truyền thống đỉnh cao vùng Kinh Bắc.', 'https://images.unsplash.com/photo-1599583196884-60be78ee4b45?q=80&w=200', 4.60);
END
GO
