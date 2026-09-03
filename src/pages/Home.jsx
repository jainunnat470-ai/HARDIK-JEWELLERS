import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  Menu, X, Phone, MapPin, Clock, 
  ShieldCheck, Heart, Award, Share2,
  ChevronLeft, ChevronRight
} from 'lucide-react';


// Banners customized for HARDIK JEWELLERS exact layout using Model Images
const bannerImages = [
  {
    desktopUrl: '/assets/gold_banner_desktop.jpg',
    mobileUrl: '/assets/gold_banner_mobile.jpg',
    line2: 'Timeless Elegance Crafted In Gold'
  }
];


// Best Sellers
const bestSellerImages = [
  
  {
    url: '/assets/ZIPRINGS/new_ring_3.jpeg',
    title: 'Modern Geometric Gents Ring'
  },
  {
    url: '/assets/ZIPMANGALSUTRA/new_mangalsutra_2.jpeg',
    title: 'Elegant Short Mangalsutra'
  },
  {
    url: '/assets/ZIPRINGS/new_ring_1.jpeg',
    title: 'Elegant Ladies Gold Ring'
  },
  
  {
    url: '/assets/ZIPRINGS/new_ring_4.jpeg',
    title: 'Classic Gents Band Ring'
  }
];

// Bangles - all images from ZIPBANGLES_NEW
const bangleImages = [];

// Gents Bracelets - all images from ZIPGENTSBRACELET
const gentsBraceletImages = [
  { id: 'gbr-1', url: '/assets/ZIPGENTSBRACELET/GBR1.jpg', title: 'Gents Gold Bracelet GBR1', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-2', url: '/assets/ZIPGENTSBRACELET/GBR2.jpg', title: 'Gents Gold Bracelet GBR2', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-3', url: '/assets/ZIPGENTSBRACELET/GBR3.jpg', title: 'Gents Gold Bracelet GBR3', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-4', url: '/assets/ZIPGENTSBRACELET/GBR4.jpg', title: 'Gents Gold Bracelet GBR4', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-5', url: '/assets/ZIPGENTSBRACELET/GBR5.jpg', title: 'Gents Gold Bracelet GBR5', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-6', url: '/assets/ZIPGENTSBRACELET/GBR6.jpg', title: 'Gents Gold Bracelet GBR6', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-7', url: '/assets/ZIPGENTSBRACELET/GBR7.jpg', title: 'Gents Gold Bracelet GBR7', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-8', url: '/assets/ZIPGENTSBRACELET/GBR8.jpg', title: 'Gents Gold Bracelet GBR8', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-9', url: '/assets/ZIPGENTSBRACELET/GBR9.jpg', title: 'Gents Gold Bracelet GBR9', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-10', url: '/assets/ZIPGENTSBRACELET/GBR10.jpg', title: 'Gents Gold Bracelet GBR10', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-11', url: '/assets/ZIPGENTSBRACELET/GBR11.jpg', title: 'Gents Gold Bracelet GBR11', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-12', url: '/assets/ZIPGENTSBRACELET/GBR12.jpg', title: 'Gents Gold Bracelet GBR12', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-13', url: '/assets/ZIPGENTSBRACELET/GBR13.jpg', title: 'Gents Gold Bracelet GBR13', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-14', url: '/assets/ZIPGENTSBRACELET/GBR14.jpg', title: 'Gents Gold Bracelet GBR14', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-15', url: '/assets/ZIPGENTSBRACELET/GBR15.jpg', title: 'Gents Gold Bracelet GBR15', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-16', url: '/assets/ZIPGENTSBRACELET/GBR16.jpg', title: 'Gents Gold Bracelet GBR16', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-17', url: '/assets/ZIPGENTSBRACELET/GBR17.jpg', title: 'Gents Gold Bracelet GBR17', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-18', url: '/assets/ZIPGENTSBRACELET/GBR18.jpg', title: 'Gents Gold Bracelet GBR18', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-19', url: '/assets/ZIPGENTSBRACELET/GBR19.jpg', title: 'Gents Gold Bracelet GBR19', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-20', url: '/assets/ZIPGENTSBRACELET/GBR20.jpg', title: 'Gents Gold Bracelet GBR20', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-21', url: '/assets/ZIPGENTSBRACELET/GBR21.jpg', title: 'Gents Gold Bracelet GBR21', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-22', url: '/assets/ZIPGENTSBRACELET/GBR22.jpg', title: 'Gents Gold Bracelet GBR22', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-23', url: '/assets/ZIPGENTSBRACELET/GBR23.jpg', title: 'Gents Gold Bracelet GBR23', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-24', url: '/assets/ZIPGENTSBRACELET/GBR24.jpg', title: 'Gents Gold Bracelet GBR24', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-25', url: '/assets/ZIPGENTSBRACELET/GBR25.jpg', title: 'Gents Gold Bracelet GBR25', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-26', url: '/assets/ZIPGENTSBRACELET/GBR26.jpg', title: 'Gents Gold Bracelet GBR26', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-27', url: '/assets/ZIPGENTSBRACELET/GBR27.jpg', title: 'Gents Gold Bracelet GBR27', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-28', url: '/assets/ZIPGENTSBRACELET/GBR28.jpg', title: 'Gents Gold Bracelet GBR28', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-29', url: '/assets/ZIPGENTSBRACELET/GBR29.jpg', title: 'Gents Gold Bracelet GBR29', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-30', url: '/assets/ZIPGENTSBRACELET/GBR30.jpg', title: 'Gents Gold Bracelet GBR30', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-31', url: '/assets/ZIPGENTSBRACELET/GBR31.jpg', title: 'Gents Gold Bracelet GBR31', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-32', url: '/assets/ZIPGENTSBRACELET/GBR32.jpg', title: 'Gents Gold Bracelet GBR32', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-33', url: '/assets/ZIPGENTSBRACELET/GBR33.jpg', title: 'Gents Gold Bracelet GBR33', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-34', url: '/assets/ZIPGENTSBRACELET/GBR34.jpg', title: 'Gents Gold Bracelet GBR34', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-35', url: '/assets/ZIPGENTSBRACELET/GBR35.jpg', title: 'Gents Gold Bracelet GBR35', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-36', url: '/assets/ZIPGENTSBRACELET/GBR36.jpg', title: 'Gents Gold Bracelet GBR36', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-37', url: '/assets/ZIPGENTSBRACELET/GBR37.jpg', title: 'Gents Gold Bracelet GBR37', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-38', url: '/assets/ZIPGENTSBRACELET/GBR38.jpg', title: 'Gents Gold Bracelet GBR38', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-39', url: '/assets/ZIPGENTSBRACELET/GBR39.jpg', title: 'Gents Gold Bracelet GBR39', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-40', url: '/assets/ZIPGENTSBRACELET/GBR40.jpg', title: 'Gents Gold Bracelet GBR40', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-41', url: '/assets/ZIPGENTSBRACELET/GBR41.jpg', title: 'Gents Gold Bracelet GBR41', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-42', url: '/assets/ZIPGENTSBRACELET/GBR42.jpg', title: 'Gents Gold Bracelet GBR42', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-43', url: '/assets/ZIPGENTSBRACELET/GBR43.jpg', title: 'Gents Gold Bracelet GBR43', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-44', url: '/assets/ZIPGENTSBRACELET/GBR44.jpg', title: 'Gents Gold Bracelet GBR44', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-45', url: '/assets/ZIPGENTSBRACELET/GBR45.jpg', title: 'Gents Gold Bracelet GBR45', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-46', url: '/assets/ZIPGENTSBRACELET/GBR46.jpg', title: 'Gents Gold Bracelet GBR46', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-47', url: '/assets/ZIPGENTSBRACELET/GBR47.jpg', title: 'Gents Gold Bracelet GBR47', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-48', url: '/assets/ZIPGENTSBRACELET/GBR48.jpg', title: 'Gents Gold Bracelet GBR48', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-49', url: '/assets/ZIPGENTSBRACELET/GBR49.jpg', title: 'Gents Gold Bracelet GBR49', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-50', url: '/assets/ZIPGENTSBRACELET/GBR50.jpg', title: 'Gents Gold Bracelet GBR50', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-51', url: '/assets/ZIPGENTSBRACELET/GBR51.jpg', title: 'Gents Gold Bracelet GBR51', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-52', url: '/assets/ZIPGENTSBRACELET/GBR52.jpg', title: 'Gents Gold Bracelet GBR52', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-53', url: '/assets/ZIPGENTSBRACELET/GBR53.jpg', title: 'Gents Gold Bracelet GBR53', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-54', url: '/assets/ZIPGENTSBRACELET/GBR54.jpg', title: 'Gents Gold Bracelet GBR54', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-55', url: '/assets/ZIPGENTSBRACELET/GBR55.jpg', title: 'Gents Gold Bracelet GBR55', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-56', url: '/assets/ZIPGENTSBRACELET/GBR56.jpg', title: 'Gents Gold Bracelet GBR56', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'gbr-57', url: '/assets/ZIPGENTSBRACELET/GBR57.jpg', title: 'Gents Gold Bracelet GBR57', category: 'GENTS', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
];

// Gents Chains - all images from ZIPGENTSCHAINS
const gentsChainsImages = [
  { id: 'ghc-14', url: '/assets/ZIPGENTSCHAINS/GHC14.jpg', title: 'Gents Gold Chain GHC14', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'ghc-17', url: '/assets/ZIPGENTSCHAINS/GHC17.jpg', title: 'Gents Gold Chain GHC17', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'ghc-25', url: '/assets/ZIPGENTSCHAINS/GHC25.jpg', title: 'Gents Gold Chain GHC25', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'ghc-26', url: '/assets/ZIPGENTSCHAINS/GHC26.jpg', title: 'Gents Gold Chain GHC26', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'ghc-27', url: '/assets/ZIPGENTSCHAINS/GHC27.jpg', title: 'Gents Gold Chain GHC27', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'ghc-28', url: '/assets/ZIPGENTSCHAINS/GHC28.jpg', title: 'Gents Gold Chain GHC28', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'ghc-29', url: '/assets/ZIPGENTSCHAINS/GHC29.jpg', title: 'Gents Gold Chain GHC29', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'ghc-30', url: '/assets/ZIPGENTSCHAINS/GHC30.jpg', title: 'Gents Gold Chain GHC30', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'ghc-31', url: '/assets/ZIPGENTSCHAINS/GHC31.jpg', title: 'Gents Gold Chain GHC31', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'ghc-32', url: '/assets/ZIPGENTSCHAINS/GHC32.jpg', title: 'Gents Gold Chain GHC32', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'ghc-6', url: '/assets/ZIPGENTSCHAINS/GHC6.jpg', title: 'Gents Gold Chain GHC6', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-101', url: '/assets/ZIPGENTSCHAINS/GIC101.jpg', title: 'Gents Italian Chain GIC101', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-102', url: '/assets/ZIPGENTSCHAINS/GIC102.jpg', title: 'Gents Italian Chain GIC102', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-104', url: '/assets/ZIPGENTSCHAINS/GIC104.jpg', title: 'Gents Italian Chain GIC104', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-105', url: '/assets/ZIPGENTSCHAINS/GIC105.jpg', title: 'Gents Italian Chain GIC105', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-106', url: '/assets/ZIPGENTSCHAINS/GIC106.jpg', title: 'Gents Italian Chain GIC106', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-111', url: '/assets/ZIPGENTSCHAINS/GIC111.jpg', title: 'Gents Italian Chain GIC111', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-12', url: '/assets/ZIPGENTSCHAINS/GIC12.jpg', title: 'Gents Italian Chain GIC12', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-14', url: '/assets/ZIPGENTSCHAINS/GIC14.jpg', title: 'Gents Italian Chain GIC14', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-19', url: '/assets/ZIPGENTSCHAINS/GIC19.jpg', title: 'Gents Italian Chain GIC19', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-20', url: '/assets/ZIPGENTSCHAINS/GIC20.jpg', title: 'Gents Italian Chain GIC20', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-27', url: '/assets/ZIPGENTSCHAINS/GIC27.jpg', title: 'Gents Italian Chain GIC27', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-28', url: '/assets/ZIPGENTSCHAINS/GIC28.jpg', title: 'Gents Italian Chain GIC28', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-3', url: '/assets/ZIPGENTSCHAINS/GIC3.jpg', title: 'Gents Italian Chain GIC3', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-34', url: '/assets/ZIPGENTSCHAINS/GIC34.jpg', title: 'Gents Italian Chain GIC34', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-35', url: '/assets/ZIPGENTSCHAINS/GIC35.jpg', title: 'Gents Italian Chain GIC35', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-36', url: '/assets/ZIPGENTSCHAINS/GIC36.jpg', title: 'Gents Italian Chain GIC36', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-38', url: '/assets/ZIPGENTSCHAINS/GIC38.jpg', title: 'Gents Italian Chain GIC38', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-39', url: '/assets/ZIPGENTSCHAINS/GIC39.jpg', title: 'Gents Italian Chain GIC39', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-4', url: '/assets/ZIPGENTSCHAINS/GIC4.jpg', title: 'Gents Italian Chain GIC4', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-46', url: '/assets/ZIPGENTSCHAINS/GIC46.jpg', title: 'Gents Italian Chain GIC46', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-47', url: '/assets/ZIPGENTSCHAINS/GIC47.jpg', title: 'Gents Italian Chain GIC47', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-5', url: '/assets/ZIPGENTSCHAINS/GIC5.jpg', title: 'Gents Italian Chain GIC5', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-54', url: '/assets/ZIPGENTSCHAINS/GIC54.jpg', title: 'Gents Italian Chain GIC54', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-55', url: '/assets/ZIPGENTSCHAINS/GIC55.jpg', title: 'Gents Italian Chain GIC55', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-57', url: '/assets/ZIPGENTSCHAINS/GIC57.jpg', title: 'Gents Italian Chain GIC57', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-58', url: '/assets/ZIPGENTSCHAINS/GIC58.jpg', title: 'Gents Italian Chain GIC58', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-65', url: '/assets/ZIPGENTSCHAINS/GIC65.jpg', title: 'Gents Italian Chain GIC65', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-7', url: '/assets/ZIPGENTSCHAINS/GIC7.jpg', title: 'Gents Italian Chain GIC7', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-70', url: '/assets/ZIPGENTSCHAINS/GIC70.jpg', title: 'Gents Italian Chain GIC70', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-76', url: '/assets/ZIPGENTSCHAINS/GIC76.jpg', title: 'Gents Italian Chain GIC76', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-80', url: '/assets/ZIPGENTSCHAINS/GIC80.jpg', title: 'Gents Italian Chain GIC80', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-81', url: '/assets/ZIPGENTSCHAINS/GIC81.jpg', title: 'Gents Italian Chain GIC81', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-84', url: '/assets/ZIPGENTSCHAINS/GIC84.jpg', title: 'Gents Italian Chain GIC84', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-87', url: '/assets/ZIPGENTSCHAINS/GIC87.jpg', title: 'Gents Italian Chain GIC87', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-92', url: '/assets/ZIPGENTSCHAINS/GIC92.jpg', title: 'Gents Italian Chain GIC92', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-94', url: '/assets/ZIPGENTSCHAINS/GIC94.jpg', title: 'Gents Italian Chain GIC94', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-95', url: '/assets/ZIPGENTSCHAINS/GIC95.jpg', title: 'Gents Italian Chain GIC95', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-96', url: '/assets/ZIPGENTSCHAINS/GIC96.jpg', title: 'Gents Italian Chain GIC96', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-98', url: '/assets/ZIPGENTSCHAINS/GIC98.jpg', title: 'Gents Italian Chain GIC98', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gic-99', url: '/assets/ZIPGENTSCHAINS/GIC99.jpg', title: 'Gents Italian Chain GIC99', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gkb-28', url: '/assets/ZIPGENTSCHAINS/GKB28.jpg', title: 'Gents Kadi Bracelet GKB28', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
  { id: 'gkb-29', url: '/assets/ZIPGENTSCHAINS/GKB29.jpg', title: 'Gents Kadi Bracelet GKB29', category: 'GENTS', subCategory: 'CHAINS', purity: '22K Hallmarked Gold' },
];

// Gents Lockets - all images from ZIPGENTSLOCKET
const gentsLocketImages = [
  { id: 'glk-2', url: '/assets/ZIPGENTSLOCKET/GLK2.jpg', title: 'Gents Gold Locket GLK2', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-3', url: '/assets/ZIPGENTSLOCKET/GLK3.jpg', title: 'Gents Gold Locket GLK3', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-5', url: '/assets/ZIPGENTSLOCKET/GLK5.jpg', title: 'Gents Gold Locket GLK5', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-7', url: '/assets/ZIPGENTSLOCKET/GLK7.jpg', title: 'Gents Gold Locket GLK7', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-8', url: '/assets/ZIPGENTSLOCKET/GLK8.jpg', title: 'Gents Gold Locket GLK8', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-9', url: '/assets/ZIPGENTSLOCKET/GLK9.jpg', title: 'Gents Gold Locket GLK9', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-10', url: '/assets/ZIPGENTSLOCKET/GLK10.jpg', title: 'Gents Gold Locket GLK10', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-11', url: '/assets/ZIPGENTSLOCKET/GLK11.jpg', title: 'Gents Gold Locket GLK11', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-12', url: '/assets/ZIPGENTSLOCKET/GLK12.jpg', title: 'Gents Gold Locket GLK12', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-13', url: '/assets/ZIPGENTSLOCKET/GLK13.jpg', title: 'Gents Gold Locket GLK13', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-14', url: '/assets/ZIPGENTSLOCKET/GLK14.jpg', title: 'Gents Gold Locket GLK14', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-16', url: '/assets/ZIPGENTSLOCKET/GLK16.jpg', title: 'Gents Gold Locket GLK16', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-17', url: '/assets/ZIPGENTSLOCKET/GLK17.jpg', title: 'Gents Gold Locket GLK17', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-18', url: '/assets/ZIPGENTSLOCKET/GLK18.jpg', title: 'Gents Gold Locket GLK18', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-19', url: '/assets/ZIPGENTSLOCKET/GLK19.jpg', title: 'Gents Gold Locket GLK19', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-20', url: '/assets/ZIPGENTSLOCKET/GLK20.jpg', title: 'Gents Gold Locket GLK20', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-21', url: '/assets/ZIPGENTSLOCKET/GLK21.jpg', title: 'Gents Gold Locket GLK21', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-23', url: '/assets/ZIPGENTSLOCKET/GLK23.jpg', title: 'Gents Gold Locket GLK23', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-24', url: '/assets/ZIPGENTSLOCKET/GLK24.jpg', title: 'Gents Gold Locket GLK24', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-25', url: '/assets/ZIPGENTSLOCKET/GLK25.jpg', title: 'Gents Gold Locket GLK25', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-26', url: '/assets/ZIPGENTSLOCKET/GLK26.jpg', title: 'Gents Gold Locket GLK26', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-28', url: '/assets/ZIPGENTSLOCKET/GLK28.jpg', title: 'Gents Gold Locket GLK28', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-30', url: '/assets/ZIPGENTSLOCKET/GLK30.jpg', title: 'Gents Gold Locket GLK30', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-31', url: '/assets/ZIPGENTSLOCKET/GLK31.jpg', title: 'Gents Gold Locket GLK31', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-32', url: '/assets/ZIPGENTSLOCKET/GLK32.jpg', title: 'Gents Gold Locket GLK32', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-33', url: '/assets/ZIPGENTSLOCKET/GLK33.jpg', title: 'Gents Gold Locket GLK33', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-34', url: '/assets/ZIPGENTSLOCKET/GLK34.jpg', title: 'Gents Gold Locket GLK34', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-35', url: '/assets/ZIPGENTSLOCKET/GLK35.jpg', title: 'Gents Gold Locket GLK35', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-36', url: '/assets/ZIPGENTSLOCKET/GLK36.jpg', title: 'Gents Gold Locket GLK36', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-38', url: '/assets/ZIPGENTSLOCKET/GLK38.jpg', title: 'Gents Gold Locket GLK38', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-39', url: '/assets/ZIPGENTSLOCKET/GLK39.jpg', title: 'Gents Gold Locket GLK39', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-40', url: '/assets/ZIPGENTSLOCKET/GLK40.jpg', title: 'Gents Gold Locket GLK40', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-41', url: '/assets/ZIPGENTSLOCKET/GLK41.jpg', title: 'Gents Gold Locket GLK41', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-43', url: '/assets/ZIPGENTSLOCKET/GLK43.jpg', title: 'Gents Gold Locket GLK43', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-44', url: '/assets/ZIPGENTSLOCKET/GLK44.jpg', title: 'Gents Gold Locket GLK44', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-45', url: '/assets/ZIPGENTSLOCKET/GLK45.jpg', title: 'Gents Gold Locket GLK45', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-46', url: '/assets/ZIPGENTSLOCKET/GLK46.jpg', title: 'Gents Gold Locket GLK46', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-51', url: '/assets/ZIPGENTSLOCKET/GLK51.jpg', title: 'Gents Gold Locket GLK51', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-52', url: '/assets/ZIPGENTSLOCKET/GLK52.jpg', title: 'Gents Gold Locket GLK52', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-57', url: '/assets/ZIPGENTSLOCKET/GLK57.jpg', title: 'Gents Gold Locket GLK57', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-60', url: '/assets/ZIPGENTSLOCKET/GLK60.jpg', title: 'Gents Gold Locket GLK60', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-61', url: '/assets/ZIPGENTSLOCKET/GLK61.jpg', title: 'Gents Gold Locket GLK61', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-62', url: '/assets/ZIPGENTSLOCKET/GLK62.jpg', title: 'Gents Gold Locket GLK62', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-63', url: '/assets/ZIPGENTSLOCKET/GLK63.jpg', title: 'Gents Gold Locket GLK63', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-65', url: '/assets/ZIPGENTSLOCKET/GLK65.jpg', title: 'Gents Gold Locket GLK65', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-68', url: '/assets/ZIPGENTSLOCKET/GLK68.jpg', title: 'Gents Gold Locket GLK68', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-69', url: '/assets/ZIPGENTSLOCKET/GLK69.jpg', title: 'Gents Gold Locket GLK69', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-70', url: '/assets/ZIPGENTSLOCKET/GLK70.jpg', title: 'Gents Gold Locket GLK70', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-75', url: '/assets/ZIPGENTSLOCKET/GLK75.jpg', title: 'Gents Gold Locket GLK75', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-76', url: '/assets/ZIPGENTSLOCKET/GLK76.jpg', title: 'Gents Gold Locket GLK76', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-78', url: '/assets/ZIPGENTSLOCKET/GLK78.jpg', title: 'Gents Gold Locket GLK78', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
  { id: 'glk-79', url: '/assets/ZIPGENTSLOCKET/GLK79.jpg', title: 'Gents Gold Locket GLK79', category: 'GENTS', subCategory: 'LOCKETS', purity: '22K Hallmarked Gold' },
];

// Necklaces / Chains / Wedding items
const earringImages = [
  {
    id: 'earring-1',
    url: '/assets/ZIPMODELS/whatsapp-image-2026-05-25-at-4.50.46-pm.jpeg',
    title: 'Royal Kundan Haram Long Necklace',
    category: 'LADIES',
    weight: '72.5 Grams',
    purity: '22K Hallmarked Gold'
  },
  {
    id: 'earring-2',
    url: '/assets/ZIPMODELS/whatsapp-image-2026-05-25-at-4.50.46-pm-1.jpeg',
    title: 'Antique Gold Choker Neckpiece',
    category: 'LADIES',
    weight: '45.8 Grams',
    purity: '22K Hallmarked Gold'
  },
  {
    id: 'earring-3',
    url: '/assets/ZIPMODELS/whatsapp-image-2026-05-25-at-4.50.47-pm-1.jpeg',
    title: 'Imperial Heavy Wedding Necklace',
    category: 'LADIES',
    weight: '84.2 Grams',
    purity: '22K Hallmarked Gold'
  },
  {
    id: 'earring-4',
    url: '/assets/ZIPMODELS/whatsapp-image-2026-05-25-at-4.50.47-pm.jpeg',
    title: 'Indo-Italian Premium Gold Chain',
    category: 'LADIES',
    weight: '28.6 Grams',
    purity: '22K Hallmarked Gold'
  }
];

// Mangalsutra -> Ladies
const mangalsutraImages = [];

// Rings from ZIPRINGS
const ringImages = [
  {
    id: 'ring-1',
    url: '/assets/ZIPRINGS/new_ring_1.jpeg',
    title: 'Elegant Ladies Gold Ring',
    category: 'LADIES',
    weight: '12.0 Grams',
    purity: '22K Hallmarked Gold'
  },
  {
    id: 'ring-2',
    url: '/assets/ZIPRINGS/new_ring_2.jpeg',
    title: 'Floral Ladies Gold Ring',
    category: 'LADIES',
    weight: '15.5 Grams',
    purity: '22K Hallmarked Gold'
  },
  {
    id: 'ring-3',
    url: '/assets/ZIPRINGS/new_ring_3.jpeg',
    title: 'Modern Geometric Gents Ring',
    category: 'GENTS',
    weight: '14.2 Grams',
    purity: '22K Hallmarked Gold'
  },
  {
    id: 'ring-4',
    url: '/assets/ZIPRINGS/new_ring_4.jpeg',
    title: 'Classic Gents Band Ring',
    category: 'GENTS',
    weight: '10.5 Grams',
    purity: '22K Hallmarked Gold'
  }
];

// Ladies Bracelets
const ladiesBraceletImages = [
  { id: 'lb-glb2', url: '/assets/ZIPLADIESBRACELET/GLB2.jpg', title: 'Ladies Bracelet GLB2', category: 'LADIES', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'lb-glb20', url: '/assets/ZIPLADIESBRACELET/GLB20.jpg', title: 'Ladies Bracelet GLB20', category: 'LADIES', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'lb-glb22', url: '/assets/ZIPLADIESBRACELET/GLB22.jpg', title: 'Ladies Bracelet GLB22', category: 'LADIES', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'lb-glb3', url: '/assets/ZIPLADIESBRACELET/GLB3.jpg', title: 'Ladies Bracelet GLB3', category: 'LADIES', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'lb-glb4', url: '/assets/ZIPLADIESBRACELET/GLB4.jpg', title: 'Ladies Bracelet GLB4', category: 'LADIES', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'lb-glb5', url: '/assets/ZIPLADIESBRACELET/GLB5.jpg', title: 'Ladies Bracelet GLB5', category: 'LADIES', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'lb-glb7', url: '/assets/ZIPLADIESBRACELET/GLB7.jpg', title: 'Ladies Bracelet GLB7', category: 'LADIES', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'lb-glb8', url: '/assets/ZIPLADIESBRACELET/GLB8.jpg', title: 'Ladies Bracelet GLB8', category: 'LADIES', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
  { id: 'lb-glb9', url: '/assets/ZIPLADIESBRACELET/GLB9.jpg', title: 'Ladies Bracelet GLB9', category: 'LADIES', subCategory: 'BRACELETS', purity: '22K Hallmarked Gold' },
];

// Long Mangalsutra
const longMangalsutraImages = [];

// Short Mangalsutra
const shortMangalsutraImages = [];

// Necklaces
const necklaceImages = [
  { id: 'nc-gln1', url: '/assets/ZIPNECKLACES/GLN1.jpg', title: 'Necklace GLN1', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln10', url: '/assets/ZIPNECKLACES/GLN10.jpg', title: 'Necklace GLN10', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln13', url: '/assets/ZIPNECKLACES/GLN13.jpg', title: 'Necklace GLN13', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln14', url: '/assets/ZIPNECKLACES/GLN14.jpg', title: 'Necklace GLN14', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln15', url: '/assets/ZIPNECKLACES/GLN15.jpg', title: 'Necklace GLN15', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln16', url: '/assets/ZIPNECKLACES/GLN16.jpg', title: 'Necklace GLN16', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln17', url: '/assets/ZIPNECKLACES/GLN17.jpg', title: 'Necklace GLN17', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln2', url: '/assets/ZIPNECKLACES/GLN2.jpg', title: 'Necklace GLN2', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln20', url: '/assets/ZIPNECKLACES/GLN20.jpg', title: 'Necklace GLN20', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln21', url: '/assets/ZIPNECKLACES/GLN21.jpg', title: 'Necklace GLN21', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln22', url: '/assets/ZIPNECKLACES/GLN22.jpg', title: 'Necklace GLN22', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln23', url: '/assets/ZIPNECKLACES/GLN23.jpg', title: 'Necklace GLN23', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln24', url: '/assets/ZIPNECKLACES/GLN24.jpg', title: 'Necklace GLN24', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln25', url: '/assets/ZIPNECKLACES/GLN25.jpg', title: 'Necklace GLN25', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln26', url: '/assets/ZIPNECKLACES/GLN26.jpg', title: 'Necklace GLN26', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln29', url: '/assets/ZIPNECKLACES/GLN29.jpg', title: 'Necklace GLN29', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln3', url: '/assets/ZIPNECKLACES/GLN3.jpg', title: 'Necklace GLN3', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln30', url: '/assets/ZIPNECKLACES/GLN30.jpg', title: 'Necklace GLN30', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln31', url: '/assets/ZIPNECKLACES/GLN31.jpg', title: 'Necklace GLN31', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln33', url: '/assets/ZIPNECKLACES/GLN33.jpg', title: 'Necklace GLN33', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln34', url: '/assets/ZIPNECKLACES/GLN34.jpg', title: 'Necklace GLN34', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln35', url: '/assets/ZIPNECKLACES/GLN35.jpg', title: 'Necklace GLN35', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln36', url: '/assets/ZIPNECKLACES/GLN36.jpg', title: 'Necklace GLN36', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln37', url: '/assets/ZIPNECKLACES/GLN37.jpg', title: 'Necklace GLN37', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln4', url: '/assets/ZIPNECKLACES/GLN4.jpg', title: 'Necklace GLN4', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln40', url: '/assets/ZIPNECKLACES/GLN40.jpg', title: 'Necklace GLN40', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln41', url: '/assets/ZIPNECKLACES/GLN41.jpg', title: 'Necklace GLN41', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln42', url: '/assets/ZIPNECKLACES/GLN42.jpg', title: 'Necklace GLN42', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln44', url: '/assets/ZIPNECKLACES/GLN44.jpg', title: 'Necklace GLN44', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln45', url: '/assets/ZIPNECKLACES/GLN45.jpg', title: 'Necklace GLN45', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln46', url: '/assets/ZIPNECKLACES/GLN46.jpg', title: 'Necklace GLN46', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln7', url: '/assets/ZIPNECKLACES/GLN7.jpg', title: 'Necklace GLN7', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln8', url: '/assets/ZIPNECKLACES/GLN8.jpg', title: 'Necklace GLN8', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gln9', url: '/assets/ZIPNECKLACES/GLN9.jpg', title: 'Necklace GLN9', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn1', url: '/assets/ZIPNECKLACES/GSN1.jpg', title: 'Necklace GSN1', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn10', url: '/assets/ZIPNECKLACES/GSN10.jpg', title: 'Necklace GSN10', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn11', url: '/assets/ZIPNECKLACES/GSN11.jpg', title: 'Necklace GSN11', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn15', url: '/assets/ZIPNECKLACES/GSN15.jpg', title: 'Necklace GSN15', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn16', url: '/assets/ZIPNECKLACES/GSN16.jpg', title: 'Necklace GSN16', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn17', url: '/assets/ZIPNECKLACES/GSN17.jpg', title: 'Necklace GSN17', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn18', url: '/assets/ZIPNECKLACES/GSN18.jpg', title: 'Necklace GSN18', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn20', url: '/assets/ZIPNECKLACES/GSN20.jpg', title: 'Necklace GSN20', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn21', url: '/assets/ZIPNECKLACES/GSN21.jpg', title: 'Necklace GSN21', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn22', url: '/assets/ZIPNECKLACES/GSN22.jpg', title: 'Necklace GSN22', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn24', url: '/assets/ZIPNECKLACES/GSN24.jpg', title: 'Necklace GSN24', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn25', url: '/assets/ZIPNECKLACES/GSN25.jpg', title: 'Necklace GSN25', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn28', url: '/assets/ZIPNECKLACES/GSN28.jpg', title: 'Necklace GSN28', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn29', url: '/assets/ZIPNECKLACES/GSN29.jpg', title: 'Necklace GSN29', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn3', url: '/assets/ZIPNECKLACES/GSN3.jpg', title: 'Necklace GSN3', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn30', url: '/assets/ZIPNECKLACES/GSN30.jpg', title: 'Necklace GSN30', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn34', url: '/assets/ZIPNECKLACES/GSN34.jpg', title: 'Necklace GSN34', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn35', url: '/assets/ZIPNECKLACES/GSN35.jpg', title: 'Necklace GSN35', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn36', url: '/assets/ZIPNECKLACES/GSN36.jpg', title: 'Necklace GSN36', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn37', url: '/assets/ZIPNECKLACES/GSN37.jpg', title: 'Necklace GSN37', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn4', url: '/assets/ZIPNECKLACES/GSN4.jpg', title: 'Necklace GSN4', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn40', url: '/assets/ZIPNECKLACES/GSN40.jpg', title: 'Necklace GSN40', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn41', url: '/assets/ZIPNECKLACES/GSN41.jpg', title: 'Necklace GSN41', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn43', url: '/assets/ZIPNECKLACES/GSN43.jpg', title: 'Necklace GSN43', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn44', url: '/assets/ZIPNECKLACES/GSN44.jpg', title: 'Necklace GSN44', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn45', url: '/assets/ZIPNECKLACES/GSN45.jpg', title: 'Necklace GSN45', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn46', url: '/assets/ZIPNECKLACES/GSN46.jpg', title: 'Necklace GSN46', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn48', url: '/assets/ZIPNECKLACES/GSN48.jpg', title: 'Necklace GSN48', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn49', url: '/assets/ZIPNECKLACES/GSN49.jpg', title: 'Necklace GSN49', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn5', url: '/assets/ZIPNECKLACES/GSN5.jpg', title: 'Necklace GSN5', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn50', url: '/assets/ZIPNECKLACES/GSN50.jpg', title: 'Necklace GSN50', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn53', url: '/assets/ZIPNECKLACES/GSN53.jpg', title: 'Necklace GSN53', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn54', url: '/assets/ZIPNECKLACES/GSN54.jpg', title: 'Necklace GSN54', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn55', url: '/assets/ZIPNECKLACES/GSN55.jpg', title: 'Necklace GSN55', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn58', url: '/assets/ZIPNECKLACES/GSN58.jpg', title: 'Necklace GSN58', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn59', url: '/assets/ZIPNECKLACES/GSN59.jpg', title: 'Necklace GSN59', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn6', url: '/assets/ZIPNECKLACES/GSN6.jpg', title: 'Necklace GSN6', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn60', url: '/assets/ZIPNECKLACES/GSN60.jpg', title: 'Necklace GSN60', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn61', url: '/assets/ZIPNECKLACES/GSN61.jpg', title: 'Necklace GSN61', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn64', url: '/assets/ZIPNECKLACES/GSN64.jpg', title: 'Necklace GSN64', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn65', url: '/assets/ZIPNECKLACES/GSN65.jpg', title: 'Necklace GSN65', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn67', url: '/assets/ZIPNECKLACES/GSN67.jpg', title: 'Necklace GSN67', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn7', url: '/assets/ZIPNECKLACES/GSN7.jpg', title: 'Necklace GSN7', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn70', url: '/assets/ZIPNECKLACES/GSN70.jpg', title: 'Necklace GSN70', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn71', url: '/assets/ZIPNECKLACES/GSN71.jpg', title: 'Necklace GSN71', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn74', url: '/assets/ZIPNECKLACES/GSN74.jpg', title: 'Necklace GSN74', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn75', url: '/assets/ZIPNECKLACES/GSN75.jpg', title: 'Necklace GSN75', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn76', url: '/assets/ZIPNECKLACES/GSN76.jpg', title: 'Necklace GSN76', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn79', url: '/assets/ZIPNECKLACES/GSN79.jpg', title: 'Necklace GSN79', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn8', url: '/assets/ZIPNECKLACES/GSN8.jpg', title: 'Necklace GSN8', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn80', url: '/assets/ZIPNECKLACES/GSN80.jpg', title: 'Necklace GSN80', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn81', url: '/assets/ZIPNECKLACES/GSN81.jpg', title: 'Necklace GSN81', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn82', url: '/assets/ZIPNECKLACES/GSN82.jpg', title: 'Necklace GSN82', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn84', url: '/assets/ZIPNECKLACES/GSN84.jpg', title: 'Necklace GSN84', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn85', url: '/assets/ZIPNECKLACES/GSN85.jpg', title: 'Necklace GSN85', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn86', url: '/assets/ZIPNECKLACES/GSN86.jpg', title: 'Necklace GSN86', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn87', url: '/assets/ZIPNECKLACES/GSN87.jpg', title: 'Necklace GSN87', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn90', url: '/assets/ZIPNECKLACES/GSN90.jpg', title: 'Necklace GSN90', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn91', url: '/assets/ZIPNECKLACES/GSN91.jpg', title: 'Necklace GSN91', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn92', url: '/assets/ZIPNECKLACES/GSN92.jpg', title: 'Necklace GSN92', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
  { id: 'nc-gsn93', url: '/assets/ZIPNECKLACES/GSN93.jpg', title: 'Necklace GSN93', category: 'LADIES', subCategory: 'NECKLACES', purity: '22K Hallmarked Gold' },
];


// Ladies Rings
const ladiesRingImages = [
  { id: 'lr-glc1', url: '/assets/ZIPLADIESRINGS/GLC1.jpg', title: 'Ladies Ring GLC1', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc10', url: '/assets/ZIPLADIESRINGS/GLC10.jpg', title: 'Ladies Ring GLC10', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc100', url: '/assets/ZIPLADIESRINGS/GLC100.jpg', title: 'Ladies Ring GLC100', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc101', url: '/assets/ZIPLADIESRINGS/GLC101.jpg', title: 'Ladies Ring GLC101', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc102', url: '/assets/ZIPLADIESRINGS/GLC102.jpg', title: 'Ladies Ring GLC102', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc103', url: '/assets/ZIPLADIESRINGS/GLC103.jpg', title: 'Ladies Ring GLC103', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc104', url: '/assets/ZIPLADIESRINGS/GLC104.jpg', title: 'Ladies Ring GLC104', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc105', url: '/assets/ZIPLADIESRINGS/GLC105.jpg', title: 'Ladies Ring GLC105', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc106', url: '/assets/ZIPLADIESRINGS/GLC106.jpg', title: 'Ladies Ring GLC106', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc107', url: '/assets/ZIPLADIESRINGS/GLC107.jpg', title: 'Ladies Ring GLC107', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc108', url: '/assets/ZIPLADIESRINGS/GLC108.jpg', title: 'Ladies Ring GLC108', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc109', url: '/assets/ZIPLADIESRINGS/GLC109.jpg', title: 'Ladies Ring GLC109', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc11', url: '/assets/ZIPLADIESRINGS/GLC11.jpg', title: 'Ladies Ring GLC11', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc110', url: '/assets/ZIPLADIESRINGS/GLC110.jpg', title: 'Ladies Ring GLC110', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc111', url: '/assets/ZIPLADIESRINGS/GLC111.jpg', title: 'Ladies Ring GLC111', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc112', url: '/assets/ZIPLADIESRINGS/GLC112.jpg', title: 'Ladies Ring GLC112', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc113', url: '/assets/ZIPLADIESRINGS/GLC113.jpg', title: 'Ladies Ring GLC113', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc114', url: '/assets/ZIPLADIESRINGS/GLC114.jpg', title: 'Ladies Ring GLC114', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc115', url: '/assets/ZIPLADIESRINGS/GLC115.jpg', title: 'Ladies Ring GLC115', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc116', url: '/assets/ZIPLADIESRINGS/GLC116.jpg', title: 'Ladies Ring GLC116', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc117', url: '/assets/ZIPLADIESRINGS/GLC117.jpg', title: 'Ladies Ring GLC117', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc118', url: '/assets/ZIPLADIESRINGS/GLC118.jpg', title: 'Ladies Ring GLC118', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc119', url: '/assets/ZIPLADIESRINGS/GLC119.jpg', title: 'Ladies Ring GLC119', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc12', url: '/assets/ZIPLADIESRINGS/GLC12.jpg', title: 'Ladies Ring GLC12', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc120', url: '/assets/ZIPLADIESRINGS/GLC120.jpg', title: 'Ladies Ring GLC120', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc121', url: '/assets/ZIPLADIESRINGS/GLC121.jpg', title: 'Ladies Ring GLC121', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc125', url: '/assets/ZIPLADIESRINGS/GLC125.jpg', title: 'Ladies Ring GLC125', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc126', url: '/assets/ZIPLADIESRINGS/GLC126.jpg', title: 'Ladies Ring GLC126', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc127', url: '/assets/ZIPLADIESRINGS/GLC127.jpg', title: 'Ladies Ring GLC127', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc128', url: '/assets/ZIPLADIESRINGS/GLC128.jpg', title: 'Ladies Ring GLC128', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc130', url: '/assets/ZIPLADIESRINGS/GLC130.jpg', title: 'Ladies Ring GLC130', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc131', url: '/assets/ZIPLADIESRINGS/GLC131.jpg', title: 'Ladies Ring GLC131', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc132', url: '/assets/ZIPLADIESRINGS/GLC132.jpg', title: 'Ladies Ring GLC132', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc133', url: '/assets/ZIPLADIESRINGS/GLC133.jpg', title: 'Ladies Ring GLC133', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc134', url: '/assets/ZIPLADIESRINGS/GLC134.jpg', title: 'Ladies Ring GLC134', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc137', url: '/assets/ZIPLADIESRINGS/GLC137.jpg', title: 'Ladies Ring GLC137', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc138', url: '/assets/ZIPLADIESRINGS/GLC138.jpg', title: 'Ladies Ring GLC138', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc139', url: '/assets/ZIPLADIESRINGS/GLC139.jpg', title: 'Ladies Ring GLC139', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc14', url: '/assets/ZIPLADIESRINGS/GLC14.jpg', title: 'Ladies Ring GLC14', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc140', url: '/assets/ZIPLADIESRINGS/GLC140.jpg', title: 'Ladies Ring GLC140', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc143', url: '/assets/ZIPLADIESRINGS/GLC143.jpg', title: 'Ladies Ring GLC143', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc144', url: '/assets/ZIPLADIESRINGS/GLC144.jpg', title: 'Ladies Ring GLC144', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc145', url: '/assets/ZIPLADIESRINGS/GLC145.jpg', title: 'Ladies Ring GLC145', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc149', url: '/assets/ZIPLADIESRINGS/GLC149.jpg', title: 'Ladies Ring GLC149', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc15', url: '/assets/ZIPLADIESRINGS/GLC15.jpg', title: 'Ladies Ring GLC15', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc150', url: '/assets/ZIPLADIESRINGS/GLC150.jpg', title: 'Ladies Ring GLC150', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc151', url: '/assets/ZIPLADIESRINGS/GLC151.jpg', title: 'Ladies Ring GLC151', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc153', url: '/assets/ZIPLADIESRINGS/GLC153.jpg', title: 'Ladies Ring GLC153', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc154', url: '/assets/ZIPLADIESRINGS/GLC154.jpg', title: 'Ladies Ring GLC154', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc155', url: '/assets/ZIPLADIESRINGS/GLC155.jpg', title: 'Ladies Ring GLC155', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc156', url: '/assets/ZIPLADIESRINGS/GLC156.jpg', title: 'Ladies Ring GLC156', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc16', url: '/assets/ZIPLADIESRINGS/GLC16.jpg', title: 'Ladies Ring GLC16', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc160', url: '/assets/ZIPLADIESRINGS/GLC160.jpg', title: 'Ladies Ring GLC160', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc161', url: '/assets/ZIPLADIESRINGS/GLC161.jpg', title: 'Ladies Ring GLC161', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc162', url: '/assets/ZIPLADIESRINGS/GLC162.jpg', title: 'Ladies Ring GLC162', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc164', url: '/assets/ZIPLADIESRINGS/GLC164.jpg', title: 'Ladies Ring GLC164', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc165', url: '/assets/ZIPLADIESRINGS/GLC165.jpg', title: 'Ladies Ring GLC165', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc166', url: '/assets/ZIPLADIESRINGS/GLC166.jpg', title: 'Ladies Ring GLC166', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc167', url: '/assets/ZIPLADIESRINGS/GLC167.jpg', title: 'Ladies Ring GLC167', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc17', url: '/assets/ZIPLADIESRINGS/GLC17.jpg', title: 'Ladies Ring GLC17', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc170', url: '/assets/ZIPLADIESRINGS/GLC170.jpg', title: 'Ladies Ring GLC170', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc171', url: '/assets/ZIPLADIESRINGS/GLC171.jpg', title: 'Ladies Ring GLC171', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc174', url: '/assets/ZIPLADIESRINGS/GLC174.jpg', title: 'Ladies Ring GLC174', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc175', url: '/assets/ZIPLADIESRINGS/GLC175.jpg', title: 'Ladies Ring GLC175', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc176', url: '/assets/ZIPLADIESRINGS/GLC176.jpg', title: 'Ladies Ring GLC176', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc18', url: '/assets/ZIPLADIESRINGS/GLC18.jpg', title: 'Ladies Ring GLC18', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc180', url: '/assets/ZIPLADIESRINGS/GLC180.jpg', title: 'Ladies Ring GLC180', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc181', url: '/assets/ZIPLADIESRINGS/GLC181.jpg', title: 'Ladies Ring GLC181', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc182', url: '/assets/ZIPLADIESRINGS/GLC182.jpg', title: 'Ladies Ring GLC182', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc28', url: '/assets/ZIPLADIESRINGS/GLC28.jpg', title: 'Ladies Ring GLC28', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc29', url: '/assets/ZIPLADIESRINGS/GLC29.jpg', title: 'Ladies Ring GLC29', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc30', url: '/assets/ZIPLADIESRINGS/GLC30.jpg', title: 'Ladies Ring GLC30', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc31', url: '/assets/ZIPLADIESRINGS/GLC31.jpg', title: 'Ladies Ring GLC31', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc33', url: '/assets/ZIPLADIESRINGS/GLC33.jpg', title: 'Ladies Ring GLC33', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc34', url: '/assets/ZIPLADIESRINGS/GLC34.jpg', title: 'Ladies Ring GLC34', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc51', url: '/assets/ZIPLADIESRINGS/GLC51.jpg', title: 'Ladies Ring GLC51', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc52', url: '/assets/ZIPLADIESRINGS/GLC52.jpg', title: 'Ladies Ring GLC52', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc53', url: '/assets/ZIPLADIESRINGS/GLC53.jpg', title: 'Ladies Ring GLC53', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc58', url: '/assets/ZIPLADIESRINGS/GLC58.jpg', title: 'Ladies Ring GLC58', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc59', url: '/assets/ZIPLADIESRINGS/GLC59.jpg', title: 'Ladies Ring GLC59', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc6', url: '/assets/ZIPLADIESRINGS/GLC6.jpg', title: 'Ladies Ring GLC6', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc60', url: '/assets/ZIPLADIESRINGS/GLC60.jpg', title: 'Ladies Ring GLC60', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc67', url: '/assets/ZIPLADIESRINGS/GLC67.jpg', title: 'Ladies Ring GLC67', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc68', url: '/assets/ZIPLADIESRINGS/GLC68.jpg', title: 'Ladies Ring GLC68', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc69', url: '/assets/ZIPLADIESRINGS/GLC69.jpg', title: 'Ladies Ring GLC69', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc79', url: '/assets/ZIPLADIESRINGS/GLC79.jpg', title: 'Ladies Ring GLC79', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc8', url: '/assets/ZIPLADIESRINGS/GLC8.jpg', title: 'Ladies Ring GLC8', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc80', url: '/assets/ZIPLADIESRINGS/GLC80.jpg', title: 'Ladies Ring GLC80', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc85', url: '/assets/ZIPLADIESRINGS/GLC85.jpg', title: 'Ladies Ring GLC85', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc86', url: '/assets/ZIPLADIESRINGS/GLC86.jpg', title: 'Ladies Ring GLC86', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc87', url: '/assets/ZIPLADIESRINGS/GLC87.jpg', title: 'Ladies Ring GLC87', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc88', url: '/assets/ZIPLADIESRINGS/GLC88.jpg', title: 'Ladies Ring GLC88', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-glc89', url: '/assets/ZIPLADIESRINGS/GLC89.jpg', title: 'Ladies Ring GLC89', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld10', url: '/assets/ZIPLADIESRINGS/GLD10.jpg', title: 'Ladies Ring GLD10', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld11', url: '/assets/ZIPLADIESRINGS/GLD11.jpg', title: 'Ladies Ring GLD11', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld12', url: '/assets/ZIPLADIESRINGS/GLD12.jpg', title: 'Ladies Ring GLD12', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld16', url: '/assets/ZIPLADIESRINGS/GLD16.jpg', title: 'Ladies Ring GLD16', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld18', url: '/assets/ZIPLADIESRINGS/GLD18.jpg', title: 'Ladies Ring GLD18', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld19', url: '/assets/ZIPLADIESRINGS/GLD19.jpg', title: 'Ladies Ring GLD19', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld2', url: '/assets/ZIPLADIESRINGS/GLD2.jpg', title: 'Ladies Ring GLD2', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld21', url: '/assets/ZIPLADIESRINGS/GLD21.jpg', title: 'Ladies Ring GLD21', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld22', url: '/assets/ZIPLADIESRINGS/GLD22.jpg', title: 'Ladies Ring GLD22', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld23', url: '/assets/ZIPLADIESRINGS/GLD23.jpg', title: 'Ladies Ring GLD23', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld24', url: '/assets/ZIPLADIESRINGS/GLD24.jpg', title: 'Ladies Ring GLD24', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld25', url: '/assets/ZIPLADIESRINGS/GLD25.jpg', title: 'Ladies Ring GLD25', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld26', url: '/assets/ZIPLADIESRINGS/GLD26.jpg', title: 'Ladies Ring GLD26', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld27', url: '/assets/ZIPLADIESRINGS/GLD27.jpg', title: 'Ladies Ring GLD27', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld28', url: '/assets/ZIPLADIESRINGS/GLD28.jpg', title: 'Ladies Ring GLD28', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld29', url: '/assets/ZIPLADIESRINGS/GLD29.jpg', title: 'Ladies Ring GLD29', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld3', url: '/assets/ZIPLADIESRINGS/GLD3.jpg', title: 'Ladies Ring GLD3', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld31', url: '/assets/ZIPLADIESRINGS/GLD31.jpg', title: 'Ladies Ring GLD31', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld32', url: '/assets/ZIPLADIESRINGS/GLD32.jpg', title: 'Ladies Ring GLD32', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld33', url: '/assets/ZIPLADIESRINGS/GLD33.jpg', title: 'Ladies Ring GLD33', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld34', url: '/assets/ZIPLADIESRINGS/GLD34.jpg', title: 'Ladies Ring GLD34', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld36', url: '/assets/ZIPLADIESRINGS/GLD36.jpg', title: 'Ladies Ring GLD36', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld37', url: '/assets/ZIPLADIESRINGS/GLD37.jpg', title: 'Ladies Ring GLD37', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld38', url: '/assets/ZIPLADIESRINGS/GLD38.jpg', title: 'Ladies Ring GLD38', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld39', url: '/assets/ZIPLADIESRINGS/GLD39.jpg', title: 'Ladies Ring GLD39', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld4', url: '/assets/ZIPLADIESRINGS/GLD4.jpg', title: 'Ladies Ring GLD4', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld40', url: '/assets/ZIPLADIESRINGS/GLD40.jpg', title: 'Ladies Ring GLD40', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld41', url: '/assets/ZIPLADIESRINGS/GLD41.jpg', title: 'Ladies Ring GLD41', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld42', url: '/assets/ZIPLADIESRINGS/GLD42.jpg', title: 'Ladies Ring GLD42', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld43', url: '/assets/ZIPLADIESRINGS/GLD43.jpg', title: 'Ladies Ring GLD43', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld44', url: '/assets/ZIPLADIESRINGS/GLD44.jpg', title: 'Ladies Ring GLD44', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld45', url: '/assets/ZIPLADIESRINGS/GLD45.jpg', title: 'Ladies Ring GLD45', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld46', url: '/assets/ZIPLADIESRINGS/GLD46.jpg', title: 'Ladies Ring GLD46', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld49', url: '/assets/ZIPLADIESRINGS/GLD49.jpg', title: 'Ladies Ring GLD49', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld5', url: '/assets/ZIPLADIESRINGS/GLD5.jpg', title: 'Ladies Ring GLD5', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld50', url: '/assets/ZIPLADIESRINGS/GLD50.jpg', title: 'Ladies Ring GLD50', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld52', url: '/assets/ZIPLADIESRINGS/GLD52.jpg', title: 'Ladies Ring GLD52', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld54', url: '/assets/ZIPLADIESRINGS/GLD54.jpg', title: 'Ladies Ring GLD54', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld55', url: '/assets/ZIPLADIESRINGS/GLD55.jpg', title: 'Ladies Ring GLD55', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld6', url: '/assets/ZIPLADIESRINGS/GLD6.jpg', title: 'Ladies Ring GLD6', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld61', url: '/assets/ZIPLADIESRINGS/GLD61.jpg', title: 'Ladies Ring GLD61', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld7', url: '/assets/ZIPLADIESRINGS/GLD7.jpg', title: 'Ladies Ring GLD7', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-gld8', url: '/assets/ZIPLADIESRINGS/GLD8.jpg', title: 'Ladies Ring GLD8', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk16', url: '/assets/ZIPLADIESRINGS/GRK16.jpg', title: 'Ladies Ring GRK16', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk17', url: '/assets/ZIPLADIESRINGS/GRK17.jpg', title: 'Ladies Ring GRK17', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk18', url: '/assets/ZIPLADIESRINGS/GRK18.jpg', title: 'Ladies Ring GRK18', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk2', url: '/assets/ZIPLADIESRINGS/GRK2.jpg', title: 'Ladies Ring GRK2', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk20', url: '/assets/ZIPLADIESRINGS/GRK20.jpg', title: 'Ladies Ring GRK20', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk21', url: '/assets/ZIPLADIESRINGS/GRK21.jpg', title: 'Ladies Ring GRK21', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk22', url: '/assets/ZIPLADIESRINGS/GRK22.jpg', title: 'Ladies Ring GRK22', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk28', url: '/assets/ZIPLADIESRINGS/GRK28.jpg', title: 'Ladies Ring GRK28', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk29', url: '/assets/ZIPLADIESRINGS/GRK29.jpg', title: 'Ladies Ring GRK29', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk3', url: '/assets/ZIPLADIESRINGS/GRK3.jpg', title: 'Ladies Ring GRK3', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk30', url: '/assets/ZIPLADIESRINGS/GRK30.jpg', title: 'Ladies Ring GRK30', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk31', url: '/assets/ZIPLADIESRINGS/GRK31.jpg', title: 'Ladies Ring GRK31', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk33', url: '/assets/ZIPLADIESRINGS/GRK33.jpg', title: 'Ladies Ring GRK33', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk34', url: '/assets/ZIPLADIESRINGS/GRK34.jpg', title: 'Ladies Ring GRK34', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk35', url: '/assets/ZIPLADIESRINGS/GRK35.jpg', title: 'Ladies Ring GRK35', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk36', url: '/assets/ZIPLADIESRINGS/GRK36.jpg', title: 'Ladies Ring GRK36', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk37', url: '/assets/ZIPLADIESRINGS/GRK37.jpg', title: 'Ladies Ring GRK37', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk38', url: '/assets/ZIPLADIESRINGS/GRK38.jpg', title: 'Ladies Ring GRK38', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk44', url: '/assets/ZIPLADIESRINGS/GRK44.jpg', title: 'Ladies Ring GRK44', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk45', url: '/assets/ZIPLADIESRINGS/GRK45.jpg', title: 'Ladies Ring GRK45', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk46', url: '/assets/ZIPLADIESRINGS/GRK46.jpg', title: 'Ladies Ring GRK46', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk47', url: '/assets/ZIPLADIESRINGS/GRK47.jpg', title: 'Ladies Ring GRK47', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk48', url: '/assets/ZIPLADIESRINGS/GRK48.jpg', title: 'Ladies Ring GRK48', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk49', url: '/assets/ZIPLADIESRINGS/GRK49.jpg', title: 'Ladies Ring GRK49', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk52', url: '/assets/ZIPLADIESRINGS/GRK52.jpg', title: 'Ladies Ring GRK52', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk53', url: '/assets/ZIPLADIESRINGS/GRK53.jpg', title: 'Ladies Ring GRK53', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk54', url: '/assets/ZIPLADIESRINGS/GRK54.jpg', title: 'Ladies Ring GRK54', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk55', url: '/assets/ZIPLADIESRINGS/GRK55.jpg', title: 'Ladies Ring GRK55', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk6', url: '/assets/ZIPLADIESRINGS/GRK6.jpg', title: 'Ladies Ring GRK6', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk60', url: '/assets/ZIPLADIESRINGS/GRK60.jpg', title: 'Ladies Ring GRK60', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk61', url: '/assets/ZIPLADIESRINGS/GRK61.jpg', title: 'Ladies Ring GRK61', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk62', url: '/assets/ZIPLADIESRINGS/GRK62.jpg', title: 'Ladies Ring GRK62', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk63', url: '/assets/ZIPLADIESRINGS/GRK63.jpg', title: 'Ladies Ring GRK63', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk64', url: '/assets/ZIPLADIESRINGS/GRK64.jpg', title: 'Ladies Ring GRK64', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk68', url: '/assets/ZIPLADIESRINGS/GRK68.jpg', title: 'Ladies Ring GRK68', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk69', url: '/assets/ZIPLADIESRINGS/GRK69.jpg', title: 'Ladies Ring GRK69', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk7', url: '/assets/ZIPLADIESRINGS/GRK7.jpg', title: 'Ladies Ring GRK7', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk70', url: '/assets/ZIPLADIESRINGS/GRK70.jpg', title: 'Ladies Ring GRK70', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk71', url: '/assets/ZIPLADIESRINGS/GRK71.jpg', title: 'Ladies Ring GRK71', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk72', url: '/assets/ZIPLADIESRINGS/GRK72.jpg', title: 'Ladies Ring GRK72', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk74', url: '/assets/ZIPLADIESRINGS/GRK74.jpg', title: 'Ladies Ring GRK74', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk75', url: '/assets/ZIPLADIESRINGS/GRK75.jpg', title: 'Ladies Ring GRK75', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk76', url: '/assets/ZIPLADIESRINGS/GRK76.jpg', title: 'Ladies Ring GRK76', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk83', url: '/assets/ZIPLADIESRINGS/GRK83.jpg', title: 'Ladies Ring GRK83', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk84', url: '/assets/ZIPLADIESRINGS/GRK84.jpg', title: 'Ladies Ring GRK84', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk85', url: '/assets/ZIPLADIESRINGS/GRK85.jpg', title: 'Ladies Ring GRK85', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'lr-grk86', url: '/assets/ZIPLADIESRINGS/GRK86.jpg', title: 'Ladies Ring GRK86', category: 'LADIES', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
];


// Daily Wear Tops
const dailyWearTopsImages = [
  { id: 'er-top-gtp1', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP1.jpg', title: 'Daily Wear Tops GTP1', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp10', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP10.jpg', title: 'Daily Wear Tops GTP10', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp100', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP100.jpg', title: 'Daily Wear Tops GTP100', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp101', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP101.jpg', title: 'Daily Wear Tops GTP101', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp102', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP102.jpg', title: 'Daily Wear Tops GTP102', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp103', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP103.jpg', title: 'Daily Wear Tops GTP103', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp104', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP104.jpg', title: 'Daily Wear Tops GTP104', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp105', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP105.jpg', title: 'Daily Wear Tops GTP105', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp106', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP106.jpg', title: 'Daily Wear Tops GTP106', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp107', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP107.jpg', title: 'Daily Wear Tops GTP107', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp108', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP108.jpg', title: 'Daily Wear Tops GTP108', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp109', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP109.jpg', title: 'Daily Wear Tops GTP109', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp11', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP11.jpg', title: 'Daily Wear Tops GTP11', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp110', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP110.jpg', title: 'Daily Wear Tops GTP110', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp111', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP111.jpg', title: 'Daily Wear Tops GTP111', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp112', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP112.jpg', title: 'Daily Wear Tops GTP112', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp116', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP116.jpg', title: 'Daily Wear Tops GTP116', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp117', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP117.jpg', title: 'Daily Wear Tops GTP117', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp118', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP118.jpg', title: 'Daily Wear Tops GTP118', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp119', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP119.jpg', title: 'Daily Wear Tops GTP119', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp12', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP12.jpg', title: 'Daily Wear Tops GTP12', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp120', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP120.jpg', title: 'Daily Wear Tops GTP120', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp121', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP121.jpg', title: 'Daily Wear Tops GTP121', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp124', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP124.jpg', title: 'Daily Wear Tops GTP124', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp125', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP125.jpg', title: 'Daily Wear Tops GTP125', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp126', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP126.jpg', title: 'Daily Wear Tops GTP126', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp127', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP127.jpg', title: 'Daily Wear Tops GTP127', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp128', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP128.jpg', title: 'Daily Wear Tops GTP128', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp129', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP129.jpg', title: 'Daily Wear Tops GTP129', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp13', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP13.jpg', title: 'Daily Wear Tops GTP13', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp130', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP130.jpg', title: 'Daily Wear Tops GTP130', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp133', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP133.jpg', title: 'Daily Wear Tops GTP133', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp135', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP135.jpg', title: 'Daily Wear Tops GTP135', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp136', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP136.jpg', title: 'Daily Wear Tops GTP136', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp137', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP137.jpg', title: 'Daily Wear Tops GTP137', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp138', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP138.jpg', title: 'Daily Wear Tops GTP138', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp139', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP139.jpg', title: 'Daily Wear Tops GTP139', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp14', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP14.jpg', title: 'Daily Wear Tops GTP14', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp140', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP140.jpg', title: 'Daily Wear Tops GTP140', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp148', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP148.jpg', title: 'Daily Wear Tops GTP148', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp149', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP149.jpg', title: 'Daily Wear Tops GTP149', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp150', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP150.jpg', title: 'Daily Wear Tops GTP150', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp152', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP152.jpg', title: 'Daily Wear Tops GTP152', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp153', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP153.jpg', title: 'Daily Wear Tops GTP153', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp154', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP154.jpg', title: 'Daily Wear Tops GTP154', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp159', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP159.jpg', title: 'Daily Wear Tops GTP159', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp16', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP16.jpg', title: 'Daily Wear Tops GTP16', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp160', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP160.jpg', title: 'Daily Wear Tops GTP160', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp161', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP161.jpg', title: 'Daily Wear Tops GTP161', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp166', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP166.jpg', title: 'Daily Wear Tops GTP166', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp167', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP167.jpg', title: 'Daily Wear Tops GTP167', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp168', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP168.jpg', title: 'Daily Wear Tops GTP168', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp169', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP169.jpg', title: 'Daily Wear Tops GTP169', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp17', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP17.jpg', title: 'Daily Wear Tops GTP17', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp189', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP189.jpg', title: 'Daily Wear Tops GTP189', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp19', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP19.jpg', title: 'Daily Wear Tops GTP19', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp191', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP191.jpg', title: 'Daily Wear Tops GTP191', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp193', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP193.jpg', title: 'Daily Wear Tops GTP193', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp196', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP196.jpg', title: 'Daily Wear Tops GTP196', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp198', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP198.jpg', title: 'Daily Wear Tops GTP198', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp199', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP199.jpg', title: 'Daily Wear Tops GTP199', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp203', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP203.jpg', title: 'Daily Wear Tops GTP203', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp204', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP204.jpg', title: 'Daily Wear Tops GTP204', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp206', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP206.jpg', title: 'Daily Wear Tops GTP206', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp212', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP212.jpg', title: 'Daily Wear Tops GTP212', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp215', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP215.jpg', title: 'Daily Wear Tops GTP215', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp216', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP216.jpg', title: 'Daily Wear Tops GTP216', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp22', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP22.jpg', title: 'Daily Wear Tops GTP22', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp25', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP25.jpg', title: 'Daily Wear Tops GTP25', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp26', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP26.jpg', title: 'Daily Wear Tops GTP26', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp27', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP27.jpg', title: 'Daily Wear Tops GTP27', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp29', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP29.jpg', title: 'Daily Wear Tops GTP29', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp3', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP3.jpg', title: 'Daily Wear Tops GTP3', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp30', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP30.jpg', title: 'Daily Wear Tops GTP30', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp33', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP33.jpg', title: 'Daily Wear Tops GTP33', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp34', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP34.jpg', title: 'Daily Wear Tops GTP34', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp35', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP35.jpg', title: 'Daily Wear Tops GTP35', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp36', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP36.jpg', title: 'Daily Wear Tops GTP36', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp37', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP37.jpg', title: 'Daily Wear Tops GTP37', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp38', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP38.jpg', title: 'Daily Wear Tops GTP38', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp41', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP41.jpg', title: 'Daily Wear Tops GTP41', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp42', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP42.jpg', title: 'Daily Wear Tops GTP42', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp43', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP43.jpg', title: 'Daily Wear Tops GTP43', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp44', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP44.jpg', title: 'Daily Wear Tops GTP44', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp48', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP48.jpg', title: 'Daily Wear Tops GTP48', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp49', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP49.jpg', title: 'Daily Wear Tops GTP49', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp5', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP5.jpg', title: 'Daily Wear Tops GTP5', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp50', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP50.jpg', title: 'Daily Wear Tops GTP50', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp51', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP51.jpg', title: 'Daily Wear Tops GTP51', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp52', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP52.jpg', title: 'Daily Wear Tops GTP52', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp53', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP53.jpg', title: 'Daily Wear Tops GTP53', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp54', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP54.jpg', title: 'Daily Wear Tops GTP54', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp55', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP55.jpg', title: 'Daily Wear Tops GTP55', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp58', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP58.jpg', title: 'Daily Wear Tops GTP58', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp59', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP59.jpg', title: 'Daily Wear Tops GTP59', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp6', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP6.jpg', title: 'Daily Wear Tops GTP6', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp61', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP61.jpg', title: 'Daily Wear Tops GTP61', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp62', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP62.jpg', title: 'Daily Wear Tops GTP62', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp63', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP63.jpg', title: 'Daily Wear Tops GTP63', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp66', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP66.jpg', title: 'Daily Wear Tops GTP66', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp67', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP67.jpg', title: 'Daily Wear Tops GTP67', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp68', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP68.jpg', title: 'Daily Wear Tops GTP68', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp69', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP69.jpg', title: 'Daily Wear Tops GTP69', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp70', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP70.jpg', title: 'Daily Wear Tops GTP70', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp71', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP71.jpg', title: 'Daily Wear Tops GTP71', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp72', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP72.jpg', title: 'Daily Wear Tops GTP72', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp73', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP73.jpg', title: 'Daily Wear Tops GTP73', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp76', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP76.jpg', title: 'Daily Wear Tops GTP76', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp77', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP77.jpg', title: 'Daily Wear Tops GTP77', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp78', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP78.jpg', title: 'Daily Wear Tops GTP78', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp79', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP79.jpg', title: 'Daily Wear Tops GTP79', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp81', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP81.jpg', title: 'Daily Wear Tops GTP81', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp82', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP82.jpg', title: 'Daily Wear Tops GTP82', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp85', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP85.jpg', title: 'Daily Wear Tops GTP85', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp86', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP86.jpg', title: 'Daily Wear Tops GTP86', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp87', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP87.jpg', title: 'Daily Wear Tops GTP87', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp90', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP90.jpg', title: 'Daily Wear Tops GTP90', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp91', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP91.jpg', title: 'Daily Wear Tops GTP91', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp92', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP92.jpg', title: 'Daily Wear Tops GTP92', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp96', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP96.jpg', title: 'Daily Wear Tops GTP96', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp97', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP97.jpg', title: 'Daily Wear Tops GTP97', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp98', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP98.jpg', title: 'Daily Wear Tops GTP98', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
  { id: 'er-top-gtp99', url: '/assets/ZIPEARRINGS_NEW/DAILY_WEAR_TOPS/GTP99.jpg', title: 'Daily Wear Tops GTP99', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'DAILY WEAR TOPS', purity: '22K Hallmarked Gold' },
];

// Jumkas
const jumkaImages = [
  { id: 'er-jum-gkz1', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ1.jpg', title: 'Jumkas GKZ1', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz10', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ10.jpg', title: 'Jumkas GKZ10', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz11', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ11.jpg', title: 'Jumkas GKZ11', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz12', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ12.jpg', title: 'Jumkas GKZ12', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz13', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ13.jpg', title: 'Jumkas GKZ13', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz15', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ15.jpg', title: 'Jumkas GKZ15', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz16', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ16.jpg', title: 'Jumkas GKZ16', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz17', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ17.jpg', title: 'Jumkas GKZ17', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz18', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ18.jpg', title: 'Jumkas GKZ18', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz19', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ19.jpg', title: 'Jumkas GKZ19', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz2', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ2.jpg', title: 'Jumkas GKZ2', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz22', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ22.jpg', title: 'Jumkas GKZ22', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz23', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ23.jpg', title: 'Jumkas GKZ23', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz24', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ24.jpg', title: 'Jumkas GKZ24', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz25', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ25.jpg', title: 'Jumkas GKZ25', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz27', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ27.jpg', title: 'Jumkas GKZ27', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz28', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ28.jpg', title: 'Jumkas GKZ28', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz29', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ29.jpg', title: 'Jumkas GKZ29', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz3', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ3.jpg', title: 'Jumkas GKZ3', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz32', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ32.jpg', title: 'Jumkas GKZ32', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz33', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ33.jpg', title: 'Jumkas GKZ33', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz34', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ34.jpg', title: 'Jumkas GKZ34', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz35', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ35.jpg', title: 'Jumkas GKZ35', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz36', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ36.jpg', title: 'Jumkas GKZ36', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz37', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ37.jpg', title: 'Jumkas GKZ37', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz38', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ38.jpg', title: 'Jumkas GKZ38', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz4', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ4.jpg', title: 'Jumkas GKZ4', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz40', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ40.jpg', title: 'Jumkas GKZ40', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz41', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ41.jpg', title: 'Jumkas GKZ41', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz42', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ42.jpg', title: 'Jumkas GKZ42', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz43', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ43.jpg', title: 'Jumkas GKZ43', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz44', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ44.jpg', title: 'Jumkas GKZ44', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz45', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ45.jpg', title: 'Jumkas GKZ45', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz46', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ46.jpg', title: 'Jumkas GKZ46', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz47', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ47.jpg', title: 'Jumkas GKZ47', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz48', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ48.jpg', title: 'Jumkas GKZ48', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz5', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ5.jpg', title: 'Jumkas GKZ5', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz50', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ50.jpg', title: 'Jumkas GKZ50', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz51', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ51.jpg', title: 'Jumkas GKZ51', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz52', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ52.jpg', title: 'Jumkas GKZ52', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz53', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ53.jpg', title: 'Jumkas GKZ53', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz54', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ54.jpg', title: 'Jumkas GKZ54', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz55', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ55.jpg', title: 'Jumkas GKZ55', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz56', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ56.jpg', title: 'Jumkas GKZ56', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz57', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ57.jpg', title: 'Jumkas GKZ57', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz58', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ58.jpg', title: 'Jumkas GKZ58', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz59', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ59.jpg', title: 'Jumkas GKZ59', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz6', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ6.jpg', title: 'Jumkas GKZ6', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz60', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ60.jpg', title: 'Jumkas GKZ60', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz61', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ61.jpg', title: 'Jumkas GKZ61', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz62', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ62.jpg', title: 'Jumkas GKZ62', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz63', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ63.jpg', title: 'Jumkas GKZ63', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz64', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ64.jpg', title: 'Jumkas GKZ64', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz65', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ65.jpg', title: 'Jumkas GKZ65', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz66', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ66.jpg', title: 'Jumkas GKZ66', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz68', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ68.jpg', title: 'Jumkas GKZ68', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz69', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ69.jpg', title: 'Jumkas GKZ69', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz7', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ7.jpg', title: 'Jumkas GKZ7', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz71', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ71.jpg', title: 'Jumkas GKZ71', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz72', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ72.jpg', title: 'Jumkas GKZ72', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz73', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ73.jpg', title: 'Jumkas GKZ73', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz74', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ74.jpg', title: 'Jumkas GKZ74', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz75', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ75.jpg', title: 'Jumkas GKZ75', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz76', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ76.jpg', title: 'Jumkas GKZ76', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz78', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ78.jpg', title: 'Jumkas GKZ78', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz79', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ79.jpg', title: 'Jumkas GKZ79', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz8', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ8.jpg', title: 'Jumkas GKZ8', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz80', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ80.jpg', title: 'Jumkas GKZ80', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz82', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ82.jpg', title: 'Jumkas GKZ82', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz83', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ83.jpg', title: 'Jumkas GKZ83', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz84', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ84.jpg', title: 'Jumkas GKZ84', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz85', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ85.jpg', title: 'Jumkas GKZ85', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz86', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ86.jpg', title: 'Jumkas GKZ86', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz87', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ87.jpg', title: 'Jumkas GKZ87', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz88', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ88.jpg', title: 'Jumkas GKZ88', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz89', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ89.jpg', title: 'Jumkas GKZ89', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
  { id: 'er-jum-gkz9', url: '/assets/ZIPEARRINGS_NEW/JUMKAS/GKZ9.jpg', title: 'Jumkas GKZ9', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'JUMKAS', purity: '22K Hallmarked Gold' },
];

// Sui Dhaga
const suiDhagaImages = [
  { id: 'er-sui-gsd1', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD1.jpg', title: 'Sui Dhaga GSD1', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd10', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD10.jpg', title: 'Sui Dhaga GSD10', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd11', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD11.jpg', title: 'Sui Dhaga GSD11', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd12', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD12.jpg', title: 'Sui Dhaga GSD12', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd13', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD13.jpg', title: 'Sui Dhaga GSD13', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd14', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD14.jpg', title: 'Sui Dhaga GSD14', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd15', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD15.jpg', title: 'Sui Dhaga GSD15', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd18', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD18.jpg', title: 'Sui Dhaga GSD18', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd19', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD19.jpg', title: 'Sui Dhaga GSD19', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd2', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD2.jpg', title: 'Sui Dhaga GSD2', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd20', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD20.jpg', title: 'Sui Dhaga GSD20', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd21', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD21.jpg', title: 'Sui Dhaga GSD21', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd24', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD24.jpg', title: 'Sui Dhaga GSD24', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd25', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD25.jpg', title: 'Sui Dhaga GSD25', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd26', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD26.jpg', title: 'Sui Dhaga GSD26', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd27', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD27.jpg', title: 'Sui Dhaga GSD27', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd29', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD29.jpg', title: 'Sui Dhaga GSD29', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd3', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD3.jpg', title: 'Sui Dhaga GSD3', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd30', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD30.jpg', title: 'Sui Dhaga GSD30', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd31', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD31.jpg', title: 'Sui Dhaga GSD31', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd33', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD33.jpg', title: 'Sui Dhaga GSD33', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd34', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD34.jpg', title: 'Sui Dhaga GSD34', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd37', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD37.jpg', title: 'Sui Dhaga GSD37', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd38', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD38.jpg', title: 'Sui Dhaga GSD38', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd39', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD39.jpg', title: 'Sui Dhaga GSD39', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd42', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD42.jpg', title: 'Sui Dhaga GSD42', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd43', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD43.jpg', title: 'Sui Dhaga GSD43', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd44', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD44.jpg', title: 'Sui Dhaga GSD44', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd46', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD46.jpg', title: 'Sui Dhaga GSD46', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd47', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD47.jpg', title: 'Sui Dhaga GSD47', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd48', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD48.jpg', title: 'Sui Dhaga GSD48', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd49', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD49.jpg', title: 'Sui Dhaga GSD49', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd5', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD5.jpg', title: 'Sui Dhaga GSD5', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd50', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD50.jpg', title: 'Sui Dhaga GSD50', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd51', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD51.jpg', title: 'Sui Dhaga GSD51', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd53', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD53.jpg', title: 'Sui Dhaga GSD53', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd54', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD54.jpg', title: 'Sui Dhaga GSD54', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd55', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD55.jpg', title: 'Sui Dhaga GSD55', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd56', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD56.jpg', title: 'Sui Dhaga GSD56', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd57', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD57.jpg', title: 'Sui Dhaga GSD57', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd58', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD58.jpg', title: 'Sui Dhaga GSD58', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd59', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD59.jpg', title: 'Sui Dhaga GSD59', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd6', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD6.jpg', title: 'Sui Dhaga GSD6', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd60', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD60.jpg', title: 'Sui Dhaga GSD60', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd61', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD61.jpg', title: 'Sui Dhaga GSD61', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd62', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD62.jpg', title: 'Sui Dhaga GSD62', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd63', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD63.jpg', title: 'Sui Dhaga GSD63', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd64', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD64.jpg', title: 'Sui Dhaga GSD64', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd65', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD65.jpg', title: 'Sui Dhaga GSD65', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd66', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD66.jpg', title: 'Sui Dhaga GSD66', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd67', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD67.jpg', title: 'Sui Dhaga GSD67', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd7', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD7.jpg', title: 'Sui Dhaga GSD7', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd8', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD8.jpg', title: 'Sui Dhaga GSD8', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
  { id: 'er-sui-gsd9', url: '/assets/ZIPEARRINGS_NEW/SUI_DHAGA/GSD9.jpg', title: 'Sui Dhaga GSD9', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'SUI DHAGA', purity: '22K Hallmarked Gold' },
];

// Bali
const baliImages = [
  { id: 'er-bali-ger1', url: '/assets/ZIPEARRINGS_NEW/BALI/GER1.jpg', title: 'Bali GER1', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger10', url: '/assets/ZIPEARRINGS_NEW/BALI/GER10.jpg', title: 'Bali GER10', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger100', url: '/assets/ZIPEARRINGS_NEW/BALI/GER100.jpg', title: 'Bali GER100', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger101', url: '/assets/ZIPEARRINGS_NEW/BALI/GER101.jpg', title: 'Bali GER101', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger104', url: '/assets/ZIPEARRINGS_NEW/BALI/GER104.jpg', title: 'Bali GER104', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger105', url: '/assets/ZIPEARRINGS_NEW/BALI/GER105.jpg', title: 'Bali GER105', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger106', url: '/assets/ZIPEARRINGS_NEW/BALI/GER106.jpg', title: 'Bali GER106', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger107', url: '/assets/ZIPEARRINGS_NEW/BALI/GER107.jpg', title: 'Bali GER107', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger12', url: '/assets/ZIPEARRINGS_NEW/BALI/GER12.jpg', title: 'Bali GER12', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger13', url: '/assets/ZIPEARRINGS_NEW/BALI/GER13.jpg', title: 'Bali GER13', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger134', url: '/assets/ZIPEARRINGS_NEW/BALI/GER134.jpg', title: 'Bali GER134', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger14', url: '/assets/ZIPEARRINGS_NEW/BALI/GER14.jpg', title: 'Bali GER14', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger18', url: '/assets/ZIPEARRINGS_NEW/BALI/GER18.jpg', title: 'Bali GER18', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger19', url: '/assets/ZIPEARRINGS_NEW/BALI/GER19.jpg', title: 'Bali GER19', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger2', url: '/assets/ZIPEARRINGS_NEW/BALI/GER2.jpg', title: 'Bali GER2', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger20', url: '/assets/ZIPEARRINGS_NEW/BALI/GER20.jpg', title: 'Bali GER20', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger21', url: '/assets/ZIPEARRINGS_NEW/BALI/GER21.jpg', title: 'Bali GER21', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger25', url: '/assets/ZIPEARRINGS_NEW/BALI/GER25.jpg', title: 'Bali GER25', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger26', url: '/assets/ZIPEARRINGS_NEW/BALI/GER26.jpg', title: 'Bali GER26', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger27', url: '/assets/ZIPEARRINGS_NEW/BALI/GER27.jpg', title: 'Bali GER27', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger31', url: '/assets/ZIPEARRINGS_NEW/BALI/GER31.jpg', title: 'Bali GER31', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger32', url: '/assets/ZIPEARRINGS_NEW/BALI/GER32.jpg', title: 'Bali GER32', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger33', url: '/assets/ZIPEARRINGS_NEW/BALI/GER33.jpg', title: 'Bali GER33', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger38', url: '/assets/ZIPEARRINGS_NEW/BALI/GER38.jpg', title: 'Bali GER38', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger4', url: '/assets/ZIPEARRINGS_NEW/BALI/GER4.jpg', title: 'Bali GER4', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger40', url: '/assets/ZIPEARRINGS_NEW/BALI/GER40.jpg', title: 'Bali GER40', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger43', url: '/assets/ZIPEARRINGS_NEW/BALI/GER43.jpg', title: 'Bali GER43', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger44', url: '/assets/ZIPEARRINGS_NEW/BALI/GER44.jpg', title: 'Bali GER44', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger45', url: '/assets/ZIPEARRINGS_NEW/BALI/GER45.jpg', title: 'Bali GER45', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger48', url: '/assets/ZIPEARRINGS_NEW/BALI/GER48.jpg', title: 'Bali GER48', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger49', url: '/assets/ZIPEARRINGS_NEW/BALI/GER49.jpg', title: 'Bali GER49', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger5', url: '/assets/ZIPEARRINGS_NEW/BALI/GER5.jpg', title: 'Bali GER5', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger56', url: '/assets/ZIPEARRINGS_NEW/BALI/GER56.jpg', title: 'Bali GER56', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger57', url: '/assets/ZIPEARRINGS_NEW/BALI/GER57.jpg', title: 'Bali GER57', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger58', url: '/assets/ZIPEARRINGS_NEW/BALI/GER58.jpg', title: 'Bali GER58', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger59', url: '/assets/ZIPEARRINGS_NEW/BALI/GER59.jpg', title: 'Bali GER59', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger63', url: '/assets/ZIPEARRINGS_NEW/BALI/GER63.jpg', title: 'Bali GER63', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger64', url: '/assets/ZIPEARRINGS_NEW/BALI/GER64.jpg', title: 'Bali GER64', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger65', url: '/assets/ZIPEARRINGS_NEW/BALI/GER65.jpg', title: 'Bali GER65', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger67', url: '/assets/ZIPEARRINGS_NEW/BALI/GER67.jpg', title: 'Bali GER67', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger72', url: '/assets/ZIPEARRINGS_NEW/BALI/GER72.jpg', title: 'Bali GER72', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger73', url: '/assets/ZIPEARRINGS_NEW/BALI/GER73.jpg', title: 'Bali GER73', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger74', url: '/assets/ZIPEARRINGS_NEW/BALI/GER74.jpg', title: 'Bali GER74', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger75', url: '/assets/ZIPEARRINGS_NEW/BALI/GER75.jpg', title: 'Bali GER75', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger79', url: '/assets/ZIPEARRINGS_NEW/BALI/GER79.jpg', title: 'Bali GER79', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger8', url: '/assets/ZIPEARRINGS_NEW/BALI/GER8.jpg', title: 'Bali GER8', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger80', url: '/assets/ZIPEARRINGS_NEW/BALI/GER80.jpg', title: 'Bali GER80', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger81', url: '/assets/ZIPEARRINGS_NEW/BALI/GER81.jpg', title: 'Bali GER81', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger88', url: '/assets/ZIPEARRINGS_NEW/BALI/GER88.jpg', title: 'Bali GER88', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger89', url: '/assets/ZIPEARRINGS_NEW/BALI/GER89.jpg', title: 'Bali GER89', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger9', url: '/assets/ZIPEARRINGS_NEW/BALI/GER9.jpg', title: 'Bali GER9', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger94', url: '/assets/ZIPEARRINGS_NEW/BALI/GER94.jpg', title: 'Bali GER94', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger95', url: '/assets/ZIPEARRINGS_NEW/BALI/GER95.jpg', title: 'Bali GER95', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger96', url: '/assets/ZIPEARRINGS_NEW/BALI/GER96.jpg', title: 'Bali GER96', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
  { id: 'er-bali-ger97', url: '/assets/ZIPEARRINGS_NEW/BALI/GER97.jpg', title: 'Bali GER97', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'EARRINGS', purity: '22K Hallmarked Gold' },
];

// Buthi
const buthiImages = [
  { id: 'er-but-gbt1', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT1.jpg', title: 'Buthi GBT1', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt10', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT10.jpg', title: 'Buthi GBT10', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt100', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT100.jpg', title: 'Buthi GBT100', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt103', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT103.jpg', title: 'Buthi GBT103', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt105', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT105.jpg', title: 'Buthi GBT105', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt11', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT11.jpg', title: 'Buthi GBT11', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt118', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT118.jpg', title: 'Buthi GBT118', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt12', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT12.jpg', title: 'Buthi GBT12', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt13', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT13.jpg', title: 'Buthi GBT13', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt132', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT132.jpg', title: 'Buthi GBT132', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt133', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT133.jpg', title: 'Buthi GBT133', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt14', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT14.jpg', title: 'Buthi GBT14', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt15', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT15.jpg', title: 'Buthi GBT15', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt16', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT16.jpg', title: 'Buthi GBT16', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt17', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT17.jpg', title: 'Buthi GBT17', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt18', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT18.jpg', title: 'Buthi GBT18', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt19', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT19.jpg', title: 'Buthi GBT19', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt2', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT2.jpg', title: 'Buthi GBT2', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt20', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT20.jpg', title: 'Buthi GBT20', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt21', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT21.jpg', title: 'Buthi GBT21', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt22', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT22.jpg', title: 'Buthi GBT22', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt23', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT23.jpg', title: 'Buthi GBT23', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt24', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT24.jpg', title: 'Buthi GBT24', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt25', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT25.jpg', title: 'Buthi GBT25', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt26', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT26.jpg', title: 'Buthi GBT26', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt27', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT27.jpg', title: 'Buthi GBT27', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt28', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT28.jpg', title: 'Buthi GBT28', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt29', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT29.jpg', title: 'Buthi GBT29', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt3', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT3.jpg', title: 'Buthi GBT3', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt30', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT30.jpg', title: 'Buthi GBT30', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt31', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT31.jpg', title: 'Buthi GBT31', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt32', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT32.jpg', title: 'Buthi GBT32', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt33', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT33.jpg', title: 'Buthi GBT33', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt34', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT34.jpg', title: 'Buthi GBT34', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt35', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT35.jpg', title: 'Buthi GBT35', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt36', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT36.jpg', title: 'Buthi GBT36', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt68', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT68.jpg', title: 'Buthi GBT68', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt69', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT69.jpg', title: 'Buthi GBT69', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt7', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT7.jpg', title: 'Buthi GBT7', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt70', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT70.jpg', title: 'Buthi GBT70', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt71', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT71.jpg', title: 'Buthi GBT71', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt73', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT73.jpg', title: 'Buthi GBT73', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt75', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT75.jpg', title: 'Buthi GBT75', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt76', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT76.jpg', title: 'Buthi GBT76', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt77', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT77.jpg', title: 'Buthi GBT77', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt78', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT78.jpg', title: 'Buthi GBT78', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt79', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT79.jpg', title: 'Buthi GBT79', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt88', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT88.jpg', title: 'Buthi GBT88', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt89', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT89.jpg', title: 'Buthi GBT89', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt9', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT9.jpg', title: 'Buthi GBT9', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt90', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT90.jpg', title: 'Buthi GBT90', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt95', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT95.jpg', title: 'Buthi GBT95', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt96', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT96.jpg', title: 'Buthi GBT96', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt97', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT97.jpg', title: 'Buthi GBT97', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
  { id: 'er-but-gbt98', url: '/assets/ZIPEARRINGS_NEW/BUTHI/GBT98.jpg', title: 'Buthi GBT98', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'BUTHI', purity: '22K Hallmarked Gold' },
];

// Kanchains
const kanchainImages = [
  { id: 'er-kan-gkn1', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN1.jpg', title: 'Kanchains GKN1', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn10', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN10.jpg', title: 'Kanchains GKN10', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn11', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN11.jpg', title: 'Kanchains GKN11', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn13', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN13.jpg', title: 'Kanchains GKN13', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn14', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN14.jpg', title: 'Kanchains GKN14', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn17', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN17.jpg', title: 'Kanchains GKN17', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn18', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN18.jpg', title: 'Kanchains GKN18', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn19', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN19.jpg', title: 'Kanchains GKN19', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn2', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN2.jpg', title: 'Kanchains GKN2', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn20', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN20.jpg', title: 'Kanchains GKN20', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn23', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN23.jpg', title: 'Kanchains GKN23', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn24', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN24.jpg', title: 'Kanchains GKN24', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn25', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN25.jpg', title: 'Kanchains GKN25', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn26', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN26.jpg', title: 'Kanchains GKN26', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn28', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN28.jpg', title: 'Kanchains GKN28', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn29', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN29.jpg', title: 'Kanchains GKN29', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn3', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN3.jpg', title: 'Kanchains GKN3', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn30', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN30.jpg', title: 'Kanchains GKN30', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn33', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN33.jpg', title: 'Kanchains GKN33', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn34', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN34.jpg', title: 'Kanchains GKN34', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn35', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN35.jpg', title: 'Kanchains GKN35', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn36', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN36.jpg', title: 'Kanchains GKN36', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn37', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN37.jpg', title: 'Kanchains GKN37', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn38', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN38.jpg', title: 'Kanchains GKN38', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn39', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN39.jpg', title: 'Kanchains GKN39', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn4', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN4.jpg', title: 'Kanchains GKN4', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn40', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN40.jpg', title: 'Kanchains GKN40', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn41', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN41.jpg', title: 'Kanchains GKN41', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn43', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN43.jpg', title: 'Kanchains GKN43', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn46', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN46.jpg', title: 'Kanchains GKN46', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn48', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN48.jpg', title: 'Kanchains GKN48', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn49', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN49.jpg', title: 'Kanchains GKN49', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn5', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN5.jpg', title: 'Kanchains GKN5', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn50', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN50.jpg', title: 'Kanchains GKN50', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn52', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN52.jpg', title: 'Kanchains GKN52', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn55', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN55.jpg', title: 'Kanchains GKN55', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn58', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN58.jpg', title: 'Kanchains GKN58', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn59', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN59.jpg', title: 'Kanchains GKN59', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn6', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN6.jpg', title: 'Kanchains GKN6', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn60', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN60.jpg', title: 'Kanchains GKN60', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn62', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN62.jpg', title: 'Kanchains GKN62', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn7', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN7.jpg', title: 'Kanchains GKN7', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn8', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN8.jpg', title: 'Kanchains GKN8', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
  { id: 'er-kan-gkn9', url: '/assets/ZIPEARRINGS_NEW/KANCHAINS/GKN9.jpg', title: 'Kanchains GKN9', category: 'LADIES', subCategory: 'EARRINGS', earringType: 'KANCHAINS', purity: '22K Hallmarked Gold' },
];


// Wedding Collection - New 8 images
const weddingSetImages = [
  { id: 'wd-new-1', url: '/assets/ZIPWEDDING_NEW/ws_new_1.jpg', title: 'Bridal Gold Mangalsutra Set', category: 'WEDDING SET', subCategory: 'ALL', purity: '22K Hallmarked Gold' },
  { id: 'wd-new-2', url: '/assets/ZIPWEDDING_NEW/ws_new_2.jpg', title: 'Premium Wedding Mangalsutra Collection', category: 'WEDDING SET', subCategory: 'ALL', purity: '22K Hallmarked Gold' },
  { id: 'wd-new-3', url: '/assets/ZIPWEDDING_NEW/ws_new_3.jpg', title: 'Royal Long Haram Bridal Set', category: 'WEDDING SET', subCategory: 'ALL', purity: '22K Hallmarked Gold' },
  { id: 'wd-new-4', url: '/assets/ZIPWEDDING_NEW/ws_new_4.jpg', title: 'Antique Gold Bridal Necklace Set', category: 'WEDDING SET', subCategory: 'ALL', purity: '22K Hallmarked Gold' },
  { id: 'wd-new-5', url: '/assets/ZIPWEDDING_NEW/ws_new_5.jpg', title: 'Gold Chain & Ring Bridal Combo', category: 'WEDDING SET', subCategory: 'ALL', purity: '22K Hallmarked Gold' },
  { id: 'wd-new-6', url: '/assets/ZIPWEDDING_NEW/ws_new_6.jpg', title: 'Classic Gold Haram & Mangalsutra Set', category: 'WEDDING SET', subCategory: 'ALL', purity: '22K Hallmarked Gold' },
  { id: 'wd-new-7', url: '/assets/ZIPWEDDING_NEW/ws_new_7.jpg', title: 'Designer Mangalsutra & Earrings Set', category: 'WEDDING SET', subCategory: 'ALL', purity: '22K Hallmarked Gold' },
  { id: 'wd-new-8', url: '/assets/ZIPWEDDING_NEW/ws_new_8.jpg', title: 'Gold Chain Bangle & Ring Combo', category: 'WEDDING SET', subCategory: 'ALL', purity: '22K Hallmarked Gold' },
];

// Gents Rings
const gentsRingImages = [
  { id: 'gr-gdr1', url: '/assets/ZIPGENTSRINGS/GDR1.jpg', title: 'Gents Ring GDR1', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-gdr10', url: '/assets/ZIPGENTSRINGS/GDR10.jpg', title: 'Gents Ring GDR10', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-gdr11', url: '/assets/ZIPGENTSRINGS/GDR11.jpg', title: 'Gents Ring GDR11', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-gdr12', url: '/assets/ZIPGENTSRINGS/GDR12.jpg', title: 'Gents Ring GDR12', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-gdr13', url: '/assets/ZIPGENTSRINGS/GDR13.jpg', title: 'Gents Ring GDR13', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-gdr15', url: '/assets/ZIPGENTSRINGS/GDR15.jpg', title: 'Gents Ring GDR15', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-gdr16', url: '/assets/ZIPGENTSRINGS/GDR16.jpg', title: 'Gents Ring GDR16', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-gdr17', url: '/assets/ZIPGENTSRINGS/GDR17.jpg', title: 'Gents Ring GDR17', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-gdr18', url: '/assets/ZIPGENTSRINGS/GDR18.jpg', title: 'Gents Ring GDR18', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-gdr19', url: '/assets/ZIPGENTSRINGS/GDR19.jpg', title: 'Gents Ring GDR19', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-gdr2', url: '/assets/ZIPGENTSRINGS/GDR2.jpg', title: 'Gents Ring GDR2', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-gdr20', url: '/assets/ZIPGENTSRINGS/GDR20.jpg', title: 'Gents Ring GDR20', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-gdr21', url: '/assets/ZIPGENTSRINGS/GDR21.jpg', title: 'Gents Ring GDR21', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-gdr22', url: '/assets/ZIPGENTSRINGS/GDR22.jpg', title: 'Gents Ring GDR22', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-gdr23', url: '/assets/ZIPGENTSRINGS/GDR23.jpg', title: 'Gents Ring GDR23', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-gdr24', url: '/assets/ZIPGENTSRINGS/GDR24.jpg', title: 'Gents Ring GDR24', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-gdr25', url: '/assets/ZIPGENTSRINGS/GDR25.jpg', title: 'Gents Ring GDR25', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-gdr26', url: '/assets/ZIPGENTSRINGS/GDR26.jpg', title: 'Gents Ring GDR26', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-gdr27', url: '/assets/ZIPGENTSRINGS/GDR27.jpg', title: 'Gents Ring GDR27', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-gdr28', url: '/assets/ZIPGENTSRINGS/GDR28.jpg', title: 'Gents Ring GDR28', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-gdr3', url: '/assets/ZIPGENTSRINGS/GDR3.jpg', title: 'Gents Ring GDR3', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-gdr4', url: '/assets/ZIPGENTSRINGS/GDR4.jpg', title: 'Gents Ring GDR4', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-gdr5', url: '/assets/ZIPGENTSRINGS/GDR5.jpg', title: 'Gents Ring GDR5', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-gdr6', url: '/assets/ZIPGENTSRINGS/GDR6.jpg', title: 'Gents Ring GDR6', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-gdr7', url: '/assets/ZIPGENTSRINGS/GDR7.jpg', title: 'Gents Ring GDR7', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-gdr8', url: '/assets/ZIPGENTSRINGS/GDR8.jpg', title: 'Gents Ring GDR8', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-gdr9', url: '/assets/ZIPGENTSRINGS/GDR9.jpg', title: 'Gents Ring GDR9', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc100', url: '/assets/ZIPGENTSRINGS/GRC100.jpg', title: 'Gents Ring GRC100', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc101', url: '/assets/ZIPGENTSRINGS/GRC101.jpg', title: 'Gents Ring GRC101', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc102', url: '/assets/ZIPGENTSRINGS/GRC102.jpg', title: 'Gents Ring GRC102', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc103', url: '/assets/ZIPGENTSRINGS/GRC103.jpg', title: 'Gents Ring GRC103', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc13', url: '/assets/ZIPGENTSRINGS/GRC13.jpg', title: 'Gents Ring GRC13', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc14', url: '/assets/ZIPGENTSRINGS/GRC14.jpg', title: 'Gents Ring GRC14', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc15', url: '/assets/ZIPGENTSRINGS/GRC15.jpg', title: 'Gents Ring GRC15', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc25', url: '/assets/ZIPGENTSRINGS/GRC25.jpg', title: 'Gents Ring GRC25', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc26', url: '/assets/ZIPGENTSRINGS/GRC26.jpg', title: 'Gents Ring GRC26', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc27', url: '/assets/ZIPGENTSRINGS/GRC27.jpg', title: 'Gents Ring GRC27', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc32', url: '/assets/ZIPGENTSRINGS/GRC32.jpg', title: 'Gents Ring GRC32', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc33', url: '/assets/ZIPGENTSRINGS/GRC33.jpg', title: 'Gents Ring GRC33', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc34', url: '/assets/ZIPGENTSRINGS/GRC34.jpg', title: 'Gents Ring GRC34', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc35', url: '/assets/ZIPGENTSRINGS/GRC35.jpg', title: 'Gents Ring GRC35', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc40', url: '/assets/ZIPGENTSRINGS/GRC40.jpg', title: 'Gents Ring GRC40', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc41', url: '/assets/ZIPGENTSRINGS/GRC41.jpg', title: 'Gents Ring GRC41', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc42', url: '/assets/ZIPGENTSRINGS/GRC42.jpg', title: 'Gents Ring GRC42', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc48', url: '/assets/ZIPGENTSRINGS/GRC48.jpg', title: 'Gents Ring GRC48', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc49', url: '/assets/ZIPGENTSRINGS/GRC49.jpg', title: 'Gents Ring GRC49', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc55', url: '/assets/ZIPGENTSRINGS/GRC55.jpg', title: 'Gents Ring GRC55', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc56', url: '/assets/ZIPGENTSRINGS/GRC56.jpg', title: 'Gents Ring GRC56', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc57', url: '/assets/ZIPGENTSRINGS/GRC57.jpg', title: 'Gents Ring GRC57', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc58', url: '/assets/ZIPGENTSRINGS/GRC58.jpg', title: 'Gents Ring GRC58', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc60', url: '/assets/ZIPGENTSRINGS/GRC60.jpg', title: 'Gents Ring GRC60', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc61', url: '/assets/ZIPGENTSRINGS/GRC61.jpg', title: 'Gents Ring GRC61', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc66', url: '/assets/ZIPGENTSRINGS/GRC66.jpg', title: 'Gents Ring GRC66', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc67', url: '/assets/ZIPGENTSRINGS/GRC67.jpg', title: 'Gents Ring GRC67', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc68', url: '/assets/ZIPGENTSRINGS/GRC68.jpg', title: 'Gents Ring GRC68', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc69', url: '/assets/ZIPGENTSRINGS/GRC69.jpg', title: 'Gents Ring GRC69', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc7', url: '/assets/ZIPGENTSRINGS/GRC7.jpg', title: 'Gents Ring GRC7', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc73', url: '/assets/ZIPGENTSRINGS/GRC73.jpg', title: 'Gents Ring GRC73', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc74', url: '/assets/ZIPGENTSRINGS/GRC74.jpg', title: 'Gents Ring GRC74', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc75', url: '/assets/ZIPGENTSRINGS/GRC75.jpg', title: 'Gents Ring GRC75', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc76', url: '/assets/ZIPGENTSRINGS/GRC76.jpg', title: 'Gents Ring GRC76', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc77', url: '/assets/ZIPGENTSRINGS/GRC77.jpg', title: 'Gents Ring GRC77', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc81', url: '/assets/ZIPGENTSRINGS/GRC81.jpg', title: 'Gents Ring GRC81', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc82', url: '/assets/ZIPGENTSRINGS/GRC82.jpg', title: 'Gents Ring GRC82', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc83', url: '/assets/ZIPGENTSRINGS/GRC83.jpg', title: 'Gents Ring GRC83', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc84', url: '/assets/ZIPGENTSRINGS/GRC84.jpg', title: 'Gents Ring GRC84', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc88', url: '/assets/ZIPGENTSRINGS/GRC88.jpg', title: 'Gents Ring GRC88', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc89', url: '/assets/ZIPGENTSRINGS/GRC89.jpg', title: 'Gents Ring GRC89', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc9', url: '/assets/ZIPGENTSRINGS/GRC9.jpg', title: 'Gents Ring GRC9', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc93', url: '/assets/ZIPGENTSRINGS/GRC93.jpg', title: 'Gents Ring GRC93', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc94', url: '/assets/ZIPGENTSRINGS/GRC94.jpg', title: 'Gents Ring GRC94', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grc95', url: '/assets/ZIPGENTSRINGS/GRC95.jpg', title: 'Gents Ring GRC95', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh10', url: '/assets/ZIPGENTSRINGS/GRH10.jpg', title: 'Gents Ring GRH10', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh11', url: '/assets/ZIPGENTSRINGS/GRH11.jpg', title: 'Gents Ring GRH11', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh17', url: '/assets/ZIPGENTSRINGS/GRH17.jpg', title: 'Gents Ring GRH17', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh18', url: '/assets/ZIPGENTSRINGS/GRH18.jpg', title: 'Gents Ring GRH18', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh2', url: '/assets/ZIPGENTSRINGS/GRH2.jpg', title: 'Gents Ring GRH2', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh20', url: '/assets/ZIPGENTSRINGS/GRH20.jpg', title: 'Gents Ring GRH20', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh28', url: '/assets/ZIPGENTSRINGS/GRH28.jpg', title: 'Gents Ring GRH28', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh29', url: '/assets/ZIPGENTSRINGS/GRH29.jpg', title: 'Gents Ring GRH29', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh3', url: '/assets/ZIPGENTSRINGS/GRH3.jpg', title: 'Gents Ring GRH3', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh36', url: '/assets/ZIPGENTSRINGS/GRH36.jpg', title: 'Gents Ring GRH36', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh37', url: '/assets/ZIPGENTSRINGS/GRH37.jpg', title: 'Gents Ring GRH37', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh38', url: '/assets/ZIPGENTSRINGS/GRH38.jpg', title: 'Gents Ring GRH38', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh44', url: '/assets/ZIPGENTSRINGS/GRH44.jpg', title: 'Gents Ring GRH44', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh45', url: '/assets/ZIPGENTSRINGS/GRH45.jpg', title: 'Gents Ring GRH45', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh46', url: '/assets/ZIPGENTSRINGS/GRH46.jpg', title: 'Gents Ring GRH46', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh50', url: '/assets/ZIPGENTSRINGS/GRH50.jpg', title: 'Gents Ring GRH50', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh51', url: '/assets/ZIPGENTSRINGS/GRH51.jpg', title: 'Gents Ring GRH51', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh52', url: '/assets/ZIPGENTSRINGS/GRH52.jpg', title: 'Gents Ring GRH52', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh6', url: '/assets/ZIPGENTSRINGS/GRH6.jpg', title: 'Gents Ring GRH6', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh60', url: '/assets/ZIPGENTSRINGS/GRH60.jpg', title: 'Gents Ring GRH60', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh61', url: '/assets/ZIPGENTSRINGS/GRH61.jpg', title: 'Gents Ring GRH61', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh62', url: '/assets/ZIPGENTSRINGS/GRH62.jpg', title: 'Gents Ring GRH62', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh65', url: '/assets/ZIPGENTSRINGS/GRH65.jpg', title: 'Gents Ring GRH65', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh66', url: '/assets/ZIPGENTSRINGS/GRH66.jpg', title: 'Gents Ring GRH66', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh67', url: '/assets/ZIPGENTSRINGS/GRH67.jpg', title: 'Gents Ring GRH67', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh68', url: '/assets/ZIPGENTSRINGS/GRH68.jpg', title: 'Gents Ring GRH68', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh69', url: '/assets/ZIPGENTSRINGS/GRH69.jpg', title: 'Gents Ring GRH69', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh71', url: '/assets/ZIPGENTSRINGS/GRH71.jpg', title: 'Gents Ring GRH71', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh72', url: '/assets/ZIPGENTSRINGS/GRH72.jpg', title: 'Gents Ring GRH72', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh73', url: '/assets/ZIPGENTSRINGS/GRH73.jpg', title: 'Gents Ring GRH73', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh76', url: '/assets/ZIPGENTSRINGS/GRH76.jpg', title: 'Gents Ring GRH76', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh77', url: '/assets/ZIPGENTSRINGS/GRH77.jpg', title: 'Gents Ring GRH77', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh78', url: '/assets/ZIPGENTSRINGS/GRH78.jpg', title: 'Gents Ring GRH78', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh79', url: '/assets/ZIPGENTSRINGS/GRH79.jpg', title: 'Gents Ring GRH79', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh85', url: '/assets/ZIPGENTSRINGS/GRH85.jpg', title: 'Gents Ring GRH85', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh86', url: '/assets/ZIPGENTSRINGS/GRH86.jpg', title: 'Gents Ring GRH86', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh87', url: '/assets/ZIPGENTSRINGS/GRH87.jpg', title: 'Gents Ring GRH87', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh88', url: '/assets/ZIPGENTSRINGS/GRH88.jpg', title: 'Gents Ring GRH88', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh92', url: '/assets/ZIPGENTSRINGS/GRH92.jpg', title: 'Gents Ring GRH92', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh93', url: '/assets/ZIPGENTSRINGS/GRH93.jpg', title: 'Gents Ring GRH93', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh94', url: '/assets/ZIPGENTSRINGS/GRH94.jpg', title: 'Gents Ring GRH94', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
  { id: 'gr-grh95', url: '/assets/ZIPGENTSRINGS/GRH95.jpg', title: 'Gents Ring GRH95', category: 'GENTS', subCategory: 'RINGS', purity: '22K Hallmarked Gold' },
];

const silverImages = [
  { id: 'silver-shb1', url: '/assets/silver_heart_bangles.jpg', title: 'Pure Silver Heart Kada Bangle Pair', category: 'SILVER COLLECTION', subCategory: 'SILVER BRACELETS', purity: '92.5 Sterling Silver' }
];


const allProducts = [...bangleImages, ...ladiesBraceletImages, ...longMangalsutraImages, ...shortMangalsutraImages, ...necklaceImages, ...ladiesRingImages, ...dailyWearTopsImages, ...jumkaImages, ...suiDhagaImages, ...baliImages, ...buthiImages, ...kanchainImages, ...gentsRingImages, ...gentsBraceletImages, ...gentsChainsImages, ...gentsLocketImages, ...earringImages, ...mangalsutraImages, ...ringImages, ...weddingSetImages, ...silverImages];

const categories = ['ALL', 'GENTS', 'LADIES', 'WEDDING SET', 'SILVER COLLECTION'];

// Sub-categories per main collection
const subCategories = {
  'GENTS': ['ALL', 'RINGS', 'CHAINS', 'BRACELETS', 'LOCKETS'],
  'LADIES': ['ALL', 'BANGLES', 'SHORT MANGALSUTRA', 'LONG MANGALSUTRA', 'RINGS', 'NECKLACES', 'BRACELETS', 'EARRINGS'],
  'WEDDING SET': ['ALL'],
  'SILVER COLLECTION': ['ALL', 'SILVER CHAIN', 'SILVER BRACELETS', 'PAYAL', 'CHALLA', 'SILVER UTENSILS', 'SILVER MANGALSUTRA']
};

// Earring types â€” shown as a 3rd level when LADIES > EARRINGS is selected
const earringSubTypes = ['ALL', 'DAILY WEAR TOPS', 'JUMKAS', 'SUI DHAGA', 'BUTHI', 'KANCHAINS', 'FANCY'];

const marqueeCategories = [
  { name: 'GENTS', label: 'GENTS COLLECTION', img: '/assets/gents_collection_img.jpg' },
  { name: 'LADIES', label: 'LADIES COLLECTION', img: '/assets/ladies_collection_img.jpg' },
  { name: 'WEDDING SET', label: 'WEDDING SET', img: '/assets/wedding_cover.jpg' },
  { name: 'SILVER COLLECTION', label: 'SILVER COLLECTION', img: '/assets/silver_heart_bangles.jpg' }
];


// Circular Category Definitions
const circularCategories = [
  { label: 'RINGS', letter: 'R', cat: 'LADIES', sub: 'RINGS' },
  { label: 'EARRINGS', letter: 'E', cat: 'LADIES', sub: 'EARRINGS' },
  { label: 'PENDANTS', letter: 'P', cat: 'GENTS', sub: 'LOCKETS' },
  { label: 'BRACELETS', letter: 'B', cat: 'LADIES', sub: 'BRACELETS' },
  { label: 'ANKLETS', letter: 'A', cat: 'SILVER COLLECTION', sub: 'PAYAL' },
  { label: 'CHAINS', letter: 'C', cat: 'GENTS', sub: 'CHAINS' },
  { label: 'CHAIN + PENDANT', letter: 'CP', cat: 'LADIES', sub: 'NECKLACES' },
  { label: 'VIEW ALL', letter: 'V', cat: 'ALL', sub: 'ALL' }
];

// Consistent Simulated Pricing generator based on product ID
const getProductPricing = (product) => {
  let hash = 0;
  for (let i = 0; i < product.id.length; i++) {
    hash = product.id.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  let basePrice = 28000;
  let discount = 15;
  
  if (product.category === 'SILVER COLLECTION') {
    basePrice = 1800 + (Math.abs(hash) % 4000);
    discount = 10 + (Math.abs(hash) % 4) * 10;
  } else if (product.category === 'WEDDING SET') {
    basePrice = 85000 + (Math.abs(hash) % 150000);
    discount = 15 + (Math.abs(hash) % 3) * 5;
  } else {
    if (product.subCategory === 'RINGS') {
      basePrice = 18000 + (Math.abs(hash) % 25000);
    } else if (product.subCategory === 'NECKLACES' || product.subCategory === 'LONG MANGALSUTRA') {
      basePrice = 65000 + (Math.abs(hash) % 120000);
    } else {
      basePrice = 25000 + (Math.abs(hash) % 60000);
    }
    discount = 15 + (Math.abs(hash) % 4) * 5;
  }
  
  const salePrice = Math.round(basePrice / 100) * 100 - 1;
  const originalPrice = Math.round((salePrice / (1 - discount / 100)) / 100) * 100;
  
  return {
    salePrice: salePrice.toLocaleString('en-IN'),
    originalPrice: originalPrice.toLocaleString('en-IN'),
    discount
  };
};

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [catSlideIndex, setCatSlideIndex] = useState(0);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextCatSlide = () => {
    setCatSlideIndex((prev) => (prev + 1) % 4);
  };
  const prevCatSlide = () => {
    setCatSlideIndex((prev) => (prev - 1 + 4) % 4);
  };
  const [activeCategory, setActiveCategory] = useState('LADIES');
  const [activeSubCategory, setActiveSubCategory] = useState('BANGLES');
  const [activeEarringType, setActiveEarringType] = useState('ALL');
  const [visibleCount, setVisibleCount] = useState(16);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lightboxProduct, setLightboxProduct] = useState(null);
  const [dbProducts, setDbProducts] = useState([]);
  
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIosHelpOpen, setIsIosHelpOpen] = useState(false);

  // Helper utility to convert VAPID public key string into Uint8Array format
  const urlB64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  // Function to upload new background push subscription objects via server endpoint & Supabase storage fallback
  const saveSubscriptionToStorage = async (subscription) => {
    try {
      // 1. Try server API endpoint (bypasses browser CORS/RLS)
      const res = await fetch('/api/save-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription })
      });
      const data = await res.json();
      if (data && data.success) {
        console.log(`Push Subscription registered! Total active subscribers: ${data.count}`);
        return;
      }
    } catch (e) {
      console.warn('API save-subscription failed, falling back to direct storage upload:', e);
    }

    // 2. Direct Supabase storage fallback
    const bucketName = 'payment_screenshots';
    const fileName = 'push_subscriptions.json';
    try {
      const { data, error } = await supabase.storage.from(bucketName).download(fileName);
      let subscriptions = [];
      if (!error && data) {
        const text = await data.text();
        try {
          subscriptions = JSON.parse(text);
        } catch (e) {
          subscriptions = [];
        }
      }
      
      const subStr = JSON.stringify(subscription);
      const exists = subscriptions.some(s => JSON.stringify(s) === subStr || s.endpoint === subscription.endpoint);
      
      if (!exists) {
        subscriptions.push(subscription);
        const fileBlob = new Blob([JSON.stringify(subscriptions)], { type: 'application/json' });
        await supabase.storage.from(bucketName).upload(fileName, fileBlob, { upsert: true });
        console.log('PWA Push Subscription stored via direct storage fallback.');
      }
    } catch (err) {
      console.error('Error saving push subscription details:', err);
    }
  };

  // Active registration call to subscribe user browser endpoints to notification server
  const registerPushSubscription = async () => {
    if ('serviceWorker' in navigator && 'Notification' in window) {
      try {
        const reg = await navigator.serviceWorker.ready;
        if (reg.pushManager) {
          let subscription = await reg.pushManager.getSubscription();
          if (!subscription) {
            const applicationServerKey = urlB64ToUint8Array('BEXW6qmnlL19TYxTUbLNgawyJPLEe0dWursfi25_AxGvbBRu--RSdGIFU0OMfdd5mV5yOfSF19V7B0Jdwro497Y');
            subscription = await reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: applicationServerKey
            });
          }
          if (subscription) {
            await saveSubscriptionToStorage(subscription);
          }
        }
      } catch (err) {
        console.warn('Push manager subscription failed:', err.message);
      }
    }
  };

  const [instaFeedUrl, setInstaFeedUrl] = useState('');
  const [instaPosts, setInstaPosts] = useState([]);

  useEffect(() => {
    const fetchInstaConfig = async () => {
      try {
        const { data } = await supabase.from('store_settings').select('qr_code_url').eq('id', 1).single();
        if (data && data.qr_code_url) {
          setInstaFeedUrl(data.qr_code_url);
          if (data.qr_code_url.includes('behold.so') || data.qr_code_url.endsWith('.json')) {
            const res = await fetch(data.qr_code_url);
            const posts = await res.json();
            if (Array.isArray(posts)) {
              setInstaPosts(posts.slice(0, 9).map(p => ({
                url: p.mediaUrl || p.thumbnailUrl,
                link: p.permalink || 'https://www.instagram.com/hardikjewellers_/',
                title: p.caption || 'Instagram Post'
              })));
            }
          }
        }
      } catch (e) {
        console.warn("Instagram live API feed loading bypassed:", e);
      }
    };
    fetchInstaConfig();
  }, []);

  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          registerPushSubscription();
          alert('🔔 Rate Alerts Enabled! You will now receive system notifications on your mobile status bar / lock screen when gold rates change, even when the app is completely closed.');
        } else {
          alert('Notifications were blocked. Please enable notification permission in your browser/device settings to receive live rate updates.');
        }
      });
    } else {
      alert('Notifications are not supported on this browser.');
    }
  };

  // Auto-sync push subscription on mount for EVERY device where permission is granted, or auto-ask if default
  useEffect(() => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        registerPushSubscription();
      } else if (Notification.permission === 'default') {
        const timer = setTimeout(() => {
          requestNotificationPermission();
        }, 2500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    // Request notification permission right when they tap install
    requestNotificationPermission();

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User choice outcome: ${outcome}`);
      setDeferredPrompt(null);
    } else {
      alert("To install: Tap the browser menu button (e.g. three dots in Chrome) and choose 'Add to Home Screen' or 'Install App'.");
    }
  };



  const [likedProducts, setLikedProducts] = useState({});
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [wishlistUser, setWishlistUser] = useState(() => localStorage.getItem('HARDIK_wishlist_user') || null);
  const [isWishlistSignUp, setIsWishlistSignUp] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlistError, setWishlistError] = useState(null);

  // Sync Wishlist account state with local saving scheme session
  useEffect(() => {
    const syncUser = async () => {
      const uId = localStorage.getItem('userId');
      const wUser = localStorage.getItem('HARDIK_wishlist_user');
      
      if (uId && !wUser) {
        try {
          const { data } = await supabase
            .from('custom_users')
            .select('email')
            .eq('id', uId)
            .single();
          if (data) {
            localStorage.setItem('HARDIK_wishlist_user', data.email);
            setWishlistUser(data.email);
          }
        } catch (e) {
          console.error(e);
        }
      } else if (!uId && wUser) {
        localStorage.removeItem('HARDIK_wishlist_user');
        setWishlistUser(null);
      }
    };
    syncUser();
  }, [isWishlistModalOpen]);

  const handleWishlistLogout = () => {
    localStorage.removeItem('HARDIK_wishlist_user');
    localStorage.removeItem('userId');
    setWishlistUser(null);
  };

  const handleWishlistAuth = async (e) => {
    e.preventDefault();
    setWishlistLoading(true);
    setWishlistError(null);

    const elements = e.target.elements;
    const emailVal = elements.wishlistEmail.value;
    const passwordVal = elements.wishlistPassword.value;

    try {
      if (isWishlistSignUp) {
        const nameVal = elements.wishlistName.value;
        const phoneVal = elements.wishlistPhone.value;

        const { data, error } = await supabase
          .from('custom_users')
          .insert([{ email: emailVal, password: passwordVal, full_name: nameVal, phone_number: phoneVal }])
          .select()
          .single();

        if (error) {
          if (error.code === '23505') throw new Error('Email already registered.');
          throw error;
        }

        localStorage.setItem('userId', data.id);
        localStorage.setItem('HARDIK_wishlist_user', data.email);
        setWishlistUser(data.email);
        alert('Account created and synced successfully! You are now logged in.');
      } else {
        const { data, error } = await supabase
          .from('custom_users')
          .select('*')
          .eq('email', emailVal)
          .eq('password', passwordVal)
          .single();

        if (error || !data) {
          throw new Error('Invalid email or password');
        }

        localStorage.setItem('userId', data.id);
        localStorage.setItem('HARDIK_wishlist_user', data.email);
        setWishlistUser(data.email);
        alert('Logged in and synced successfully!');
      }
    } catch (err) {
      setWishlistError(err.message);
    } finally {
      setWishlistLoading(false);
    }
  };

  // Live Gold Rates & Admin Panel State
  const [goldRates, setGoldRates] = useState(() => {
    const saved = localStorage.getItem('HARDIK_gold_rates');
    return saved ? JSON.parse(saved) : {
      gold24k: 15500,
      gold22k: 14000,
      gold18k: 5740,
      silver: 235,
      lastUpdated: new Date().toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true }),
      updatedAt: 1716700000000 // default baseline timestamp
    };
  });

  const [showPwaNotification, setShowPwaNotification] = useState(false);

  useEffect(() => {
    document.title = "Hardik Jewellers | Premium Gold & Silver Jewellery";
  }, []);

  useEffect(() => {
    // Check if running in standalone PWA mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (isStandalone && goldRates.gold22k) {
      const timer = setTimeout(() => {
        setShowPwaNotification(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [goldRates]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  // Rate Edit Form States
  const [temp24k, setTemp24k] = useState(goldRates.gold24k);
  const [temp22k, setTemp22k] = useState(goldRates.gold22k);
  const [temp18k, setTemp18k] = useState(goldRates.gold18k);
  const [tempSilver, setTempSilver] = useState(goldRates.silver);

  // Product Upload States
  const [upTitle, setUpTitle] = useState('');
  const [upCategory, setUpCategory] = useState('LADIES');
  const [upSubCategory, setUpSubCategory] = useState('ALL');
  const [upEarringType, setUpEarringType] = useState('ALL');
  const [upWeight, setUpWeight] = useState('');
  const [upPurity, setUpPurity] = useState('');
  const [upImageFile, setUpImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Load public rates from Supabase on startup
  useEffect(() => {
    const fetchRatesAndProducts = async () => {
      const { data, error } = await supabase.from('hardik_rates').select('*').eq('id', 1).single();
      if (data && !error) {
        setGoldRates(data);
      } else {
        console.error("Error fetching live public rates:", error);
      }
      
      const { data: pData, error: pError } = await supabase.from('hardik_products').select('*').order('created_at', { ascending: false });
      if (pData && !pError) {
        setDbProducts(pData.map(p => ({
          id: p.id,
          title: p.title,
          category: p.category,
          subCategory: p.sub_category,
          earringType: p.earring_type,
          purity: p.purity,
          weight: p.weight,
          url: p.image_url
        })));
      }
    };
    fetchRatesAndProducts();
  }, []);

  // Auto-advance banner carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Auto-advance models slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product');
    if (productId) {
      const product = allProducts.find(p => p.id === productId);
      if (product) {
        setLightboxProduct(product);
      }
    }
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };


  const toggleLike = (id) => {
    const isAdding = !likedProducts[id];
    setLikedProducts(prev => ({ ...prev, [id]: isAdding }));
    if (isAdding) {
      setIsWishlistModalOpen(true);
    }
  };

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setActiveSubCategory('ALL');
    setActiveEarringType('ALL');
    const element = document.getElementById('showcase');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubCategoryClick = (sub) => {
    setActiveSubCategory(sub);
    setActiveEarringType('ALL'); // reset earring type when changing sub-cat
  };

  const handleGoToMainAdmin = () => {
    window.location.href = '/admin';
  };

  // Admin login and update logic
  const handleAdminLogin = (e) => {
    e.preventDefault();
    const envPasscode = import.meta.env.VITE_ADMIN_PASSCODE || 'arka@12';
    if (passcode === envPasscode || passcode === 'arka@12') {
      setIsAuthed(true);
      setErrorMsg('');
      setTemp24k(goldRates.gold24k);
      setTemp22k(goldRates.gold22k);
      setTemp18k(goldRates.gold18k);
      setTempSilver(goldRates.silver);
    } else {
      setErrorMsg('Invalid Passcode');
    }
  };

  const handleUploadProduct = async (e) => {
    e.preventDefault();
    if (!upImageFile) return alert("Please select an image");
    setIsUploading(true);

    try {
      const fileExt = upImageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload image to storage
      const { error: uploadError, data } = await supabase.storage
        .from('product-images')
        .upload(filePath, upImageFile);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      const newProduct = {
        id: Date.now().toString(),
        title: upTitle,
        category: upCategory,
        sub_category: upSubCategory,
        earring_type: upEarringType,
        purity: upPurity,
        weight: upWeight,
        image_url: publicUrlData.publicUrl
      };

      const { data: insertedData, error: insertError } = await supabase.from('hardik_products').insert([newProduct]).select().single();
      if (insertError) throw insertError;

      alert('Product uploaded successfully!');
      
      // Update local state
      setDbProducts(prev => [{
        id: insertedData.id,
        title: insertedData.title,
        category: insertedData.category,
        subCategory: insertedData.sub_category,
        earringType: insertedData.earring_type,
        purity: insertedData.purity,
        weight: insertedData.weight,
        url: insertedData.image_url
      }, ...prev]);

      // Reset form
      setUpTitle('');
      setUpWeight('');
      setUpPurity('');
      setUpImageFile(null);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading product: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveRates = async (e) => {
    e.preventDefault();
    const now = new Date().toLocaleString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });
    const newRates = {
      gold24k: Number(temp24k),
      gold22k: Number(temp22k),
      gold18k: Number(temp18k),
      silver: Number(tempSilver),
      lastUpdated: now
    };

    setGoldRates(newRates);

    try {
      const { error } = await supabase.from('hardik_rates').update(newRates).eq('id', 1);
      if (error) {
        console.error("Supabase API error:", error);
        alert('Failed to sync rates to database: ' + error.message);
      } else {
        alert('Live Rates updated instantly in the database!');
        
        // Broadcast Push notification to all PWA subscribed clients (works when app is closed)
        fetch('/api/send-push', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ gold22k: Number(temp22k), silver: Number(tempSilver) })
        }).then(res => res.json())
          .then(data => console.log('Push broadcast status:', data))
          .catch(err => console.error('Push broadcast error:', err));
      }
    } catch (err) {
      console.error("Network error during update:", err);
      alert('Failed to sync rates to database due to a network issue.');
    }

    setIsAdminOpen(false);
  };

  const handleAdminLogout = () => {
    setIsAuthed(false);
    setPasscode('');
    setErrorMsg('');
  };

  // Filter products based on selected main + sub + earring type
  const filteredProducts = (() => {
    const combinedProducts = [...dbProducts, ...allProducts];
    if (activeCategory === 'ALL') return combinedProducts;
    let base = combinedProducts.filter(p => p.category === activeCategory);
    if (activeSubCategory !== 'ALL') {
      base = base.filter(p => (p.subCategory || '').toUpperCase() === activeSubCategory);
    }
    // 3rd level: earring type filter
    if (activeSubCategory === 'EARRINGS' && activeEarringType !== 'ALL') {
      base = base.filter(p => (p.earringType || '').toUpperCase() === activeEarringType);
    }
    return base;
  })();

  return (
    <div className="app-container">
      
      {/* Animated Live Gold Rates Ticker Bar */}
      <div className="gold-ticker-bar">
        <div className="ticker-content-wrapper">
          <div className="ticker-items">
            <span className="ticker-live-dot">
              <span className="ping-dot"></span>
              LIVE RATE
            </span>
            <span className="ticker-item" style={{ fontWeight: 700, color: '#ffffff' }}>HARDIK JEWELLERS:</span>

            <span className="ticker-item">22K GOLD: <strong>₹{goldRates.gold22k}/g</strong></span>
            <span className="ticker-item-separator"> | </span>
            <span className="ticker-item">18K GOLD: <strong>₹{goldRates.gold18k}/g</strong></span>
            <span className="ticker-item-separator"> | </span>
            <span className="ticker-item">SILVER: <strong>₹{goldRates.silver}/g</strong></span>
            <span className="ticker-item-separator"> | </span>
            <span className="ticker-item" style={{ color: '#ffffff', fontWeight: 500, fontSize: '9px' }}>[UPDATED: {goldRates.lastUpdated}]</span>
            
            {/* Duplicated loop for infinite scrolling marquee */}
            <span className="ticker-item-separator" style={{ margin: '0 20px' }}> | </span>

            <span className="ticker-item">22K GOLD: <strong>₹{goldRates.gold22k}/g</strong></span>
            <span className="ticker-item-separator"> | </span>
            <span className="ticker-item">18K GOLD: <strong>₹{goldRates.gold18k}/g</strong></span>
            <span className="ticker-item-separator"> | </span>
            <span className="ticker-item">SILVER: <strong>₹{goldRates.silver}/g</strong></span>
            <span className="ticker-item-separator"> | </span>
            <span className="ticker-item" style={{ color: '#ffffff', fontWeight: 500, fontSize: '9px' }}>[UPDATED: {goldRates.lastUpdated}]</span>
          </div>
        </div>
      </div>
      
      {/* 1. Header & Navigation */}
      <header className="header-main">
        <div className="nav-container">
          
          <a href="#" className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/assets/logo.jpg" alt="Logo" className="brand-logo-img" style={{ height: '36px', width: '36px', borderRadius: '8px', objectFit: 'cover' }} />
            <div className="brand-text-container">
              <h1 className="brand-name" style={{ margin: 0, fontSize: 'inherit', fontWeight: 'inherit', fontFamily: 'inherit', color: 'inherit', display: 'inline' }}>HARDIK JEWELLERS</h1>
              <span className="brand-subtitle">ULHASNAGAR</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav">
            <a href="#" className="nav-link">HOME</a>
            <a href="#categories" className="nav-link">CATEGORIES</a>
            <a href="#showcase" className="nav-link">COLLECTIONS</a>
            <a href="#bestsellers" className="nav-link">BEST SELLERS</a>
            <a href="#contact" className="nav-link">CONTACT</a>
            
            {localStorage.getItem('userId') ? (
              <>
                <a href="/dashboard" className="nav-link" style={{ color: 'var(--royal-gold)', fontWeight: 'bold' }}>MY SCHEME</a>
                <a href="/" onClick={(e) => { e.preventDefault(); localStorage.removeItem('userId'); window.location.href = '/'; }} className="nav-link">LOGOUT</a>
              </>
            ) : (
              <a href="/login" className="nav-link" style={{ color: 'var(--royal-gold)', fontWeight: 'bold' }}>LOGIN / REGISTER</a>
            )}
          </nav>

          {/* Call button */}
          <a href="tel:+919892911531" className="call-btn">
            <Phone className="icon-sm" />
            <span>CALL NOW</span>
          </a>

          {/* Wishlist Header Button */}
          <button 
            onClick={() => setIsWishlistModalOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--peacock-green)',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              padding: '6px',
              marginRight: '12px'
            }}
            aria-label="View Wishlist"
            className="header-wishlist-btn"
          >
            <Heart style={{ width: '20px', height: '20px', fill: Object.values(likedProducts).filter(Boolean).length > 0 ? 'var(--peacock-green)' : 'none' }} />
            {Object.values(likedProducts).filter(Boolean).length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                background: 'var(--royal-gold)',
                color: '#ffffff',
                borderRadius: '50%',
                fontSize: '8px',
                width: '14px',
                height: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700'
              }}>
                {Object.values(likedProducts).filter(Boolean).length}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X className="icon-md" /> : <Menu className="icon-md" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <a href="#" onClick={() => setIsMenuOpen(false)} className="mobile-nav-link">HOME</a>
            <a href="#categories" onClick={() => setIsMenuOpen(false)} className="mobile-nav-link">CATEGORIES</a>
            <a href="#showcase" onClick={() => setIsMenuOpen(false)} className="mobile-nav-link">COLLECTIONS</a>
            <a href="#bestsellers" onClick={() => setIsMenuOpen(false)} className="mobile-nav-link">BEST SELLERS</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="mobile-nav-link">CONTACT</a>
            
            {localStorage.getItem('userId') ? (
              <>
                <a href="/dashboard" className="mobile-nav-link">MY SCHEME</a>
                <a href="/" onClick={(e) => { e.preventDefault(); localStorage.removeItem('userId'); window.location.href = '/'; }} className="mobile-nav-link">LOGOUT</a>
              </>
            ) : (
              <a href="/login" className="mobile-nav-link">LOGIN / REGISTER</a>
            )}

            <a href="tel:+919892911531" className="mobile-call-btn">
              <Phone className="icon-sm" />
              <span>CALL NOW</span>
            </a>
          </div>
        )}
      </header>

      {/* 2. Hero Banner Slider Carousel */}
      <section className="hero-section" style={{ height: 'auto', minHeight: 'auto', maxHeight: 'none', display: 'block', overflow: 'visible', padding: 0 }}>
        {bannerImages.map((banner, index) => (
          <div 
            key={index}
            className={`carousel-slide ${index === activeSlide ? 'active' : ''}`}
            style={{ position: 'relative', opacity: 1, display: 'block', width: '100%', height: 'auto', zIndex: 1 }}
          >
            
{/* Full-bleed responsive banner image */}
            <picture style={{ display: 'block', width: '100%', height: 'auto' }}>
              <source media="(max-width: 768px)" srcSet={banner.mobileUrl} />
              <img 
                src={banner.desktopUrl} 
                alt={banner.line2}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'contain'
                }}
              />
            </picture>


          </div>
        ))}

        {/* Carousel Indicators */}
        {bannerImages.length > 1 && (
          <div className="carousel-indicators">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`indicator-dot ${index === activeSlide ? 'active' : ''}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Carousel Navigation Arrows */}
        {bannerImages.length > 1 && (
          <>
            <button 
              onClick={prevSlide}
              className="carousel-nav-btn prev"
              aria-label="Previous slide"
              style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#ffffff', border: '1px solid #c5c2ba' }}
            >
              <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px' }} fill="none" stroke="var(--peacock-green)" strokeWidth="1.5">
                <path d="M12 2v20M2 12h20M5 5l14 14M5 19L19 5" />
                <circle cx="12" cy="12" r="2.5" fill="var(--peacock-green)" />
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className="carousel-nav-btn next"
              aria-label="Next slide"
              style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#ffffff', border: '1px solid #c5c2ba' }}
            >
              <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px' }} fill="none" stroke="var(--peacock-green)" strokeWidth="1.5">
                <path d="M12 2v20M2 12h20M5 5l14 14M5 19L19 5" />
                <circle cx="12" cy="12" r="2.5" fill="var(--peacock-green)" />
              </svg>
            </button>
          </>
        )}


      </section>

      {/* Live Jewel Rates Card */}
      <section className="live-rates-card-section" style={{ background: '#fcfaf8', padding: '40px 20px 40px', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          border: '1px solid rgba(212, 138, 148, 0.2)',
          padding: '32px',
          maxWidth: '800px',
          width: '100%',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: '700',
            letterSpacing: '2px',
            color: 'var(--text-dark)',
            margin: '0 0 24px 0',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <span className="ping-dot" style={{ position: 'relative', top: '0', transform: 'none' }}></span>
            TODAY'S LIVE RATES
          </h2>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '24px'
          }}>
            {/* 24K Gold - hidden */}
            
            {/* 22K Gold */}
            <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', background: '#fff', borderRadius: '12px', border: '1px solid rgba(212, 138, 148, 0.25)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-gray)', fontWeight: '700', letterSpacing: '1px', textAlign: 'center', marginBottom: '12px' }}>22K GOLD <span style={{fontSize: '10px', fontWeight: '500', opacity: 0.8}}>(91.6%)</span></div>
              <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--royal-gold)', textAlign: 'center', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                ₹{goldRates.gold22k} <span style={{fontSize: '13px', fontWeight: '500', color: 'var(--text-gray)'}}>/ gm</span>
              </div>
            </div>
            
            {/* Silver */}
            <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', background: '#fff', borderRadius: '12px', border: '1px solid rgba(212, 138, 148, 0.25)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-gray)', fontWeight: '700', letterSpacing: '1px', textAlign: 'center', marginBottom: '12px' }}>SILVER</div>
              <div style={{ fontSize: '22px', fontWeight: '800', color: '#6b7280', textAlign: 'center', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                ₹{goldRates.silver} <span style={{fontSize: '13px', fontWeight: '500', color: 'var(--text-gray)'}}>/ gm</span>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '24px', fontSize: '10px', color: 'var(--text-gray)', fontWeight: '500' }}>
            LAST UPDATED: {goldRates.lastUpdated}
          </div>
        </div>
      </section>

      {/* 4. Shop By Category (Sliding Carousel Style) */}
      <section id="categories" className="categories-section" style={{ background: '#fff', padding: '60px 0 40px', overflow: 'hidden' }}>
        <div className="section-inner" style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '35px' }}>
            <h2 className="section-pretitle">SHOP BY CATEGORY</h2>
            <h3 className="section-title">The collection everyone is talking about</h3>
            <div className="title-divider" style={{ margin: '15px auto 0' }} />
          </div>

          <div className="category-slider-wrapper" style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
            
            {/* Left Control Arrow */}
            {isMobile && (
              <button 
                onClick={prevCatSlide}
                style={{
                  position: 'absolute',
                  left: '-10px',
                  zIndex: 10,
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  cursor: 'pointer',
                  color: 'var(--peacock-green)'
                }}
                aria-label="Previous category"
              >
                <ChevronLeft style={{ width: '18px', height: '18px' }} />
              </button>
            )}

            {/* Slide Container Viewport */}
            <div style={{ width: '100%', overflow: 'hidden' }}>
              <div 
                style={{
                  display: 'flex',
                  transition: 'transform 0.4s ease-in-out',
                  transform: `translateX(-${catSlideIndex * (isMobile ? 80 : 0)}%)`,
                  gap: '20px'
                }}
              >
                {marqueeCategories.map((mCat) => (
                  <div 
                    key={mCat.name} 
                    onClick={() => handleCategoryClick(mCat.name)}
                    style={{
                      flex: isMobile ? '0 0 75%' : '0 0 calc(25% - 15px)',
                      background: '#ffffff',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid rgba(212, 138, 148, 0.15)',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      paddingBottom: '16px',
                      transition: 'transform 0.2s ease',
                      boxSizing: 'border-box'
                    }}
                    className="category-card-slide"
                  >
                    <div style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden', position: 'relative' }}>
                      <img 
                        src={mCat.img} alt={mCat.label} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }}
                        className="cat-slide-img"
                      />
                      {mCat.name === 'WEDDING SET' && (
                        <div style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          background: 'linear-gradient(135deg, #d48a94, #b26872)',
                          color: '#ffffff',
                          fontSize: '9px',
                          fontWeight: '800',
                          letterSpacing: '1.5px',
                          textTransform: 'uppercase',
                          padding: '5px 10px',
                          borderRadius: '20px',
                          boxShadow: '0 4px 12px rgba(212, 138, 148, 0.5)',
                          fontFamily: 'var(--font-sans)',
                          animation: 'pulse-badge 2s ease-in-out infinite'
                        }}>
                          ✨ Available
                        </div>
                      )}
                    </div>
                    <h4 style={{ 
                      margin: '12px 0 0', 
                      fontSize: '11px', 
                      fontWeight: '700', 
                      letterSpacing: '1px', 
                      color: 'var(--text-dark)', 
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-sans)'
                    }}>
                      {mCat.label}
                    </h4>
                    {mCat.name === 'WEDDING SET' && (
                      <p style={{
                        margin: '4px 0 0',
                        fontSize: '9px',
                        color: 'var(--royal-gold)',
                        fontWeight: '600',
                        fontFamily: 'var(--font-sans)',
                        letterSpacing: '0.5px'
                      }}>
                        New Collection In Stock
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Control Arrow */}
            {isMobile && (
              <button 
                onClick={nextCatSlide}
                style={{
                  position: 'absolute',
                  right: '-10px',
                  zIndex: 10,
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  cursor: 'pointer',
                  color: 'var(--peacock-green)'
                }}
                aria-label="Next category"
              >
                <ChevronRight style={{ width: '18px', height: '18px' }} />
              </button>
            )}

          </div>

        </div>
      </section>

      {/* 5. Interactive Jewelry Showcase & Category Filters */}
      <section id="showcase" className="showcase-section">
        <div className="section-inner">
          
          <div className="section-header">
            <h2 className="section-pretitle">SHOP BY COLLECTION</h2>
            <h3 className="section-title">Explore our diverse selections</h3>
            <p className="section-header-sub">BIS Hallmarked â€¢ Custom Handcrafted Designs</p>
            <div className="title-divider" />
          </div>

          {/* Main Collection Tabs (GIVA-Style Premium Menu Links) */}
          <div className="tabs-scroll-container hide-scrollbar" style={{ borderBottom: '1px solid rgba(212, 138, 148, 0.15)', paddingBottom: '0', marginBottom: '20px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setActiveSubCategory('ALL'); }}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: activeCategory === cat ? '2.5px solid var(--peacock-green)' : '2.5px solid transparent',
                  color: activeCategory === cat ? 'var(--peacock-green)' : '#8c8c8c',
                  padding: '8px 4px 10px',
                  fontSize: '12px',
                  fontWeight: '700',
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '1.2px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: 'all 0.2s ease',
                  borderRadius: 0
                }}
                className="main-nav-tab"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sub-Category Tabs (GIVA-Style Elegant Horizontal Pill Row) */}
          {activeCategory !== 'ALL' && subCategories[activeCategory] && subCategories[activeCategory].length > 1 && (
            <div className="pills-scroll-container hide-scrollbar">
              {subCategories[activeCategory].map((sub) => (
                <button
                  key={sub}
                  onClick={() => handleSubCategoryClick(sub)}
                  style={{
                    background: activeSubCategory === sub ? 'var(--peacock-green)' : '#ffffff',
                    color: activeSubCategory === sub ? '#ffffff' : '#4a4a4a',
                    border: activeSubCategory === sub ? '1px solid var(--peacock-green)' : '1px solid #e0e0e0',
                    padding: '7px 16px',
                    borderRadius: '24px',
                    fontSize: '10px',
                    fontWeight: activeSubCategory === sub ? '700' : '500',
                    fontFamily: 'var(--font-sans)',
                    letterSpacing: '0.6px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                    boxShadow: activeSubCategory === sub ? '0 2px 6px rgba(212, 138, 148, 0.25)' : '0 2px 4px rgba(0, 0, 0, 0.03)'
                  }}
                  className="sub-nav-pill"
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          {/* Earring Type Tabs (3rd level, GIVA-Style elegant tiny secondary pills) */}
          {activeCategory === 'LADIES' && activeSubCategory === 'EARRINGS' && (
            <div className="pills-scroll-container hide-scrollbar" style={{ paddingBottom: '16px', gap: '6px' }}>
              {earringSubTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => { setActiveEarringType(type); setVisibleCount(16); }}
                  style={{
                    background: activeEarringType === type ? 'var(--peacock-green)' : '#ffffff',
                    color: activeEarringType === type ? '#ffffff' : '#555555',
                    border: activeEarringType === type ? '1px solid var(--peacock-green)' : '1px solid #e5e5e5',
                    padding: '5px 12px',
                    borderRadius: '24px',
                    fontSize: '9px',
                    fontWeight: activeEarringType === type ? '700' : '500',
                    fontFamily: 'var(--font-sans)',
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                    boxShadow: activeEarringType === type ? '0 2px 5px rgba(212, 138, 148, 0.2)' : '0 1px 3px rgba(0, 0, 0, 0.02)'
                  }}
                  className="sub-nav-pill"
                >
                  {type}
                </button>
              ))}
            </div>
          )}

          {/* Product Grid Showcase */}
          <div className="product-grid">
            {filteredProducts.map((product) => {
              const pricing = getProductPricing(product);
              const genderLabel = 
                product.category === 'LADIES' ? 'Women' : 
                product.category === 'GENTS' ? 'Men' : 
                product.category === 'WEDDING SET' ? 'Wedding Special' : 'Silver Collection';
              
              return (
                <div 
                  key={product.id}
                  className="product-card"
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid rgba(0,0,0,0.06)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                    background: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                >
                  {/* Product Image Frame */}
                  <div className="product-image-outer" style={{ position: 'relative' }}>
                    <div className="product-image-inner" onClick={() => setLightboxProduct(product)} style={{ cursor: 'pointer', position: 'relative' }}>
                      <img 
                        src={product.url} alt={product.title} className="product-image"
                        loading="lazy"
                        decoding="async"
                        style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }}
                      />
                      
                      {/* Corner Wishlist Button */}
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleLike(product.id); }}
                        className={`wishlist-btn ${likedProducts[product.id] ? 'liked' : ''}`}
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          zIndex: 5,
                          background: '#ffffff',
                          border: 'none',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 3px 8px rgba(0,0,0,0.12)',
                          cursor: 'pointer',
                          color: likedProducts[product.id] ? '#ff4b4b' : '#888',
                          transition: 'all 0.2s ease'
                        }}
                        aria-label="Add to wishlist"
                      >
                        <Heart className="icon-sm" style={{ width: '15px', height: '15px', fill: likedProducts[product.id] ? '#ff4b4b' : 'none' }} />
                      </button>
                    </div>
                  </div>

                  {/* Info Area */}
                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'center', textAlign: 'center' }}>
                    <p style={{ 
                      margin: '0 0 8px', 
                      fontSize: '13px', 
                      fontWeight: '600', 
                      color: '#1a1a1a', 
                      lineHeight: 1.4, 
                      overflow: 'hidden', 
                      display: '-webkit-box', 
                      WebkitLineClamp: 2, 
                      WebkitBoxOrient: 'vertical',
                      minHeight: '36px',
                      textAlign: 'center'
                    }}>
                      {product.title}
                    </p>
                    

                    {/* Actions Row */}
                    <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: 'auto' }}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          navigator.clipboard.writeText(`https://www.hardikjewellers.in/?product=${product.id}`);
                          alert("Product link copied to clipboard!");
                        }}
                        style={{
                          background: '#fff', border: '1px solid var(--royal-gold)', color: 'var(--royal-gold)',
                          borderRadius: '6px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                        title="Copy Share Link"
                      >
                        <Share2 size={16} />
                      </button>
                      <a
                        href={`https://wa.me/919892911531?text=Hello%20HARDIK%20Jewellers,%20I%20am%20interested%20in%20buying%20your%20${encodeURIComponent(product.title)}.%0A%0AProduct%20Link:%20https://www.hardikjewellers.in/?product=${product.id}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          flex: 1,
                          textAlign: 'center',
                          background: 'var(--royal-gold)',
                          color: '#ffffff',
                          fontWeight: '700',
                          fontSize: '11px',
                          letterSpacing: '1px',
                          padding: '10px',
                          borderRadius: '6px',
                          textDecoration: 'none',
                          transition: 'background 0.2s ease',
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                        className="card-inquiry-btn"
                      >
                        INQUIRE
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="custom-order-box">
              <span className="custom-order-title">
                {activeCategory === 'SILVER COLLECTION' ? 'COMING SOON' : 'CUSTOM ORDER ONLY'}
              </span>
              <p className="custom-order-desc">
                {activeCategory === 'SILVER COLLECTION'
                  ? 'Our Silver Collection is launching soon! Visit our ULHASNAGAR showroom or WhatsApp us to enquire about Silver Chain, Bracelets, Payal, Challa, Silver Utensils and Mangalsutra.'
                  : `We craft bespoke handcrafted pieces matching your specifications for ${activeSubCategory !== 'ALL' ? activeSubCategory : activeCategory}. Please contact our ULHASNAGAR showroom on WhatsApp to design your dream piece.`
                }
              </p>
              <a 
                href="https://wa.me/919892911531?text=Hello%20HARDIK%20Jewellers,%20I%20want%20to%20place%20a%20custom%20order." 
                target="_blank"
                rel="noreferrer"
                className="custom-order-link"
              >
                {activeCategory === 'SILVER COLLECTION' ? 'ENQUIRE NOW →' : 'TALK TO DESIGNER →'}
              </a>
            </div>
          )}

        </div>
      </section>

      {/* 3.5. Digital Gold Harvest Scheme Advertisement */}
      <section className="harvest-promo-section" style={{ 
        background: 'var(--ivory-cards)', 
        color: 'var(--text-dark)', 
        padding: '80px 20px', 
        textAlign: 'center', 
        margin: '60px 0', 
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--royal-gold-border)',
        borderBottom: '1px solid var(--royal-gold-border)'
      }}>

        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.8rem', marginBottom: '15px', fontFamily: 'var(--font-serif)', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--peacock-green)' }}>Join our Digital Gold Harvest</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: 'var(--text-muted)', lineHeight: '1.8', letterSpacing: '0.5px' }}>
            Invest simply for 11 months, and get the 12th month absolutely <span style={{ color: 'var(--royal-gold)', fontWeight: 'bold' }}>FREE as a BONUS</span>! Secure your future with pure BIS Hallmarked Gold and certified diamonds.
          </p>
          <Link to="/dashboard" className="btn-gold" style={{ 
            display: 'inline-block', 
            padding: '18px 40px', 
            fontSize: '14px',
          }}>
            Start Your Golden Journey
          </Link>
        </div>
      </section>

      {/* 6. Best Sellers Gallery Horizontal Marquee Strip */}
      <section id="bestsellers" className="models-marquee-section">
        <div className="section-inner" style={{ maxWidth: '100%', padding: '0 0' }}>
          
          <div className="section-header">
            <h3 className="section-title">BEST SELLERS</h3>
            <div className="title-divider" />
          </div>

          <div className="models-marquee-container">
            <div className="models-marquee-row">
              {/* Duplicate the best sellers list twice for a seamless infinite loop */}
              {[...bestSellerImages, ...bestSellerImages].map((item, index) => (
                <div key={index} className="model-marquee-card">
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="model-marquee-img"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>



      {/* 7. Showroom Location & Contact */}
      <section id="contact" className="contact-section">
        <div className="section-inner">
          <div className="contact-grid">
            
            {/* Showroom info & Details */}
            <div className="contact-info-block">
              <h2 className="section-pretitle">VISIT OUR SHOWROOM</h2>
              <h3 className="showroom-title">HARDIK JEWELLERS</h3>
              <p className="showroom-desc">
                Step into a world of pure heritage gold and flawless diamonds. Our flagship showroom in ULHASNAGAR showcases one-of-a-kind bespoke bridal sets, beautiful light-weight items, and custom kada collections.
              </p>

              <div className="info-cards-stack">
                
                {/* Location */}
                <div className="info-card-item">
                  <div className="info-card-icon-wrapper">
                    <MapPin className="icon-md" />
                  </div>
                  <div className="info-card-text">
                    <h4 className="info-card-label">Our Showroom Address</h4>
                    <p className="info-card-value">
                      Shop no 416, Triveni building, Opposite Harmam Mohta Gate Shiv Road, Ulhasnagar 1, Birla Gate, Kalyan, Maharashtra 421103
                    </p>
                    <a href="https://maps.app.goo.gl/vxGPeZx9RukdR3dq8?g_st=ic" target="_blank" rel="noreferrer" className="whatsapp-link" style={{ marginTop: '4px', fontSize: '11px', display: 'inline-block' }}>
                      VIEW ON GOOGLE MAPS &rarr;
                    </a>
                  </div>
                </div>

                {/* Timing */}
                <div className="info-card-item">
                  <div className="info-card-icon-wrapper">
                    <Clock className="icon-md" />
                  </div>
                  <div className="info-card-text">
                    <h4 className="info-card-label">Showroom Timings</h4>
                    <p className="info-card-value">
                      Wednesday to Monday: 10:30 AM to 09:00 PM <br />
                      Tuesday: Closed
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="info-card-item">
                  <div className="info-card-icon-wrapper">
                    <Phone className="icon-md" />
                  </div>
                  <div className="info-card-text">
                    <h4 className="info-card-label">Phone & Inquiries</h4>
                    <a href="tel:+919892911531" className="info-card-phone-link">
                      07776977700
                    </a>
                    <a href="https://wa.me/919892911531?text=Hello%20HARDIK%20Jewellers,%20I%20have%20an%20inquiry%20regarding%20your%20collections." className="whatsapp-link" target="_blank" rel="noreferrer">
                      CONNECT ON WHATSAPP &rarr;
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="contact-form-block">
              <h4 className="form-card-title">Book an Appointment</h4>
              <p className="form-card-subtitle">
                Fill the form below to receive a personalized bridal collection catalog or schedule a virtual preview call.
              </p>
              
              <form onSubmit={(e) => { 
                e.preventDefault(); 
                const formData = new FormData(e.target);
                const inquiry = {
                  id: Date.now(),
                  name: formData.get('name'),
                  phone: formData.get('phone'),
                  category: formData.get('category'),
                  message: formData.get('message'),
                  date: new Date().toLocaleString()
                };
                const existing = JSON.parse(localStorage.getItem('HARDIK_inquiries') || '[]');
                localStorage.setItem('HARDIK_inquiries', JSON.stringify([inquiry, ...existing]));
                alert("Thank you! Our ULHASNAGAR showroom representative will reach out to you shortly."); 
                e.target.reset();
              }} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="input-label">Your Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required 
                      className="form-input"
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="input-label">Your Mobile Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      className="form-input"
                      placeholder="e.g. +91 99999 99999"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="input-label">Interested Category</label>
                  <select name="category" className="form-select">
                    <optgroup label="Gents Collection">
                      <option>Gents - Rings</option>
                      <option>Gents - Chains</option>
                      <option>Gents - Bracelets</option>
                      <option>Gents - Lockets</option>
                    </optgroup>
                    <optgroup label="Ladies Collection">
                      <option>Ladies - Bangles</option>
                      <option>Ladies - Short Mangalsutra</option>
                      <option>Ladies - Long Mangalsutra</option>
                      <option>Ladies - Rings</option>
                      <option>Ladies - Necklaces</option>
                      <option>Ladies - Bracelets</option>
                      <option>Ladies Earrings - Daily Wear Tops</option>
                      <option>Ladies Earrings - Jumkas</option>
                      <option>Ladies Earrings - Sui Dhaga</option>

                      <option>Ladies Earrings - Buthi</option>
                      <option>Ladies Earrings - Kanchains</option>
                      <option>Ladies Earrings - Fancy</option>
                    </optgroup>
                    <optgroup label="Wedding Set">
                      <option>Wedding Set</option>
                    </optgroup>
                    <optgroup label="Silver Collection">
                      <option>Silver Chain</option>
                      <option>Silver Bracelets</option>
                      <option>Payal</option>
                      <option>Challa</option>
                      <option>Silver Utensils</option>
                      <option>Silver Mangalsutra</option>
                    </optgroup>
                  </select>
                </div>

                <div className="form-group">
                  <label className="input-label">Additional Message</label>
                  <textarea 
                    name="message"
                    className="form-textarea"
                    placeholder="Describe your design preference, weight, and requirements..."
                  />
                </div>

                <button 
                  type="submit" 
                  className="form-submit-btn"
                >
                  SUBMIT INQUIRY
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 7.6. Instagram Feed Section */}
      <section className="instagram-feed-section" style={{
        background: '#ffffff',
        padding: '60px 24px',
        textAlign: 'center',
        borderTop: '1px solid rgba(212, 138, 148, 0.12)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <a 
            href="https://www.instagram.com/hardikjewellers_/" 
            target="_blank" 
            rel="noreferrer" 
            style={{ textDecoration: 'none', display: 'inline-block' }}
          >
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--peacock-green)',
              fontSize: '2rem',
              margin: '0 0 4px',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              @hardikjewellers_
            </h2>
            <p style={{
              fontFamily: 'var(--font-sans)',
              color: '#d48a94',
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              margin: '0 0 32px'
            }}>
              Follow Our Golden Journey On Instagram 📸
            </p>
          </a>

          {/* Real-time Widget or API Fetch Layout */}
          {instaFeedUrl && !instaFeedUrl.includes('behold.so') && !instaFeedUrl.endsWith('.json') ? (
            <div style={{ width: '100%', overflow: 'hidden', borderRadius: '16px', border: '1px solid rgba(212, 138, 148, 0.15)', marginBottom: '32px', boxShadow: '0 8px 32px rgba(212, 138, 148, 0.05)' }}>
              <iframe 
                src={instaFeedUrl} 
                className="snapwidget-widget" 
                allowtransparency="true" 
                frameBorder="0" 
                scrolling="no" 
                style={{ border: 'none', overflow: 'hidden', width: '100%', height: '420px', display: 'block' }}
                title="Instagram Realtime Feed Widget"
              ></iframe>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '12px',
              marginBottom: '32px'
            }} className="insta-grid">
              
                {([ { url: '/assets/ZIPRINGS/new_ring_3.jpeg', link: 'https://www.instagram.com/hardikjewellers_/', title: 'Gents Ring Classic' },
                { url: '/assets/silver_heart_bangles.jpg', link: 'https://www.instagram.com/hardikjewellers_/', title: 'Silver Heart Bangles' },
                { url: '/assets/gents_collection_img.jpg', link: 'https://www.instagram.com/hardikjewellers_/', title: 'Gents Gold Collection' },
                { url: '/assets/ladies_collection_img.jpg', link: 'https://www.instagram.com/hardikjewellers_/', title: 'Ladies Gold Bangle' },
                { url: '/assets/ZIPWEDDING_NEW/wc1.jpeg', link: 'https://www.instagram.com/hardikjewellers_/', title: 'Bridal Wedding Set' },
                { url: '/assets/ZIPWEDDING_NEW/wc2.jpeg', link: 'https://www.instagram.com/hardikjewellers_/', title: 'Luxury Gold Choker' },
                { url: '/assets/ZIPWEDDING_NEW/wc3.jpeg', link: 'https://www.instagram.com/hardikjewellers_/', title: 'Traditional Gold Bangle' },
                { url: '/assets/hero_2.jpg', link: 'https://www.instagram.com/hardikjewellers_/', title: 'Gold Rings Set' }
              ]).map((post, idx) => (
                <a 
                  key={idx} 
                  href={post.link} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ 
                    position: 'relative', 
                    overflow: 'hidden', 
                    borderRadius: '12px', 
                    aspectRatio: '1/1',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    display: 'block'
                  }}
                  className="insta-post-card"
                >
                  <img 
                    src={post.url} 
                    alt={post.title} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    className="insta-post-img"
                  />
                  {/* Hover overlay with Instagram logo */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(212, 138, 148, 0.7)',
                    opacity: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'column',
                    transition: 'opacity 0.3s ease',
                    color: '#ffffff'
                  }} className="insta-hover-overlay">
                    <span style={{ fontSize: '24px', marginBottom: '8px' }}>📸</span>
                    <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>View on Instagram</span>
                  </div>
                </a>
              ))}
            </div>
          )}

          <a 
            href="https://www.instagram.com/hardikjewellers_/" 
            target="_blank" 
            rel="noreferrer"
            style={{
              background: 'var(--royal-gold)',
              color: '#ffffff',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '30px',
              fontWeight: '700',
              fontSize: '11px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 24px rgba(212, 138, 148, 0.2)'
            }}
          >
            Visit Instagram Profile
          </a>
        </div>
      </section>

      {/* 7.5. Download App Section */}
      <section className="app-download-section" style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #fff6f7 100%)',
        padding: '80px 24px',
        textAlign: 'center',
        borderTop: '1px solid rgba(212, 138, 148, 0.12)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <img 
            src="/assets/logo.jpg" 
            alt="App Logo" 
            style={{ 
              height: '72px', 
              width: '72px', 
              borderRadius: '16px', 
              boxShadow: '0 8px 24px rgba(212, 138, 148, 0.2)', 
              marginBottom: '20px',
              objectFit: 'cover'
            }} 
          />
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            color: 'var(--peacock-green)',
            fontSize: '2rem',
            margin: '0 0 12px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Experience Hardik Jewellers on Mobile
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            color: '#666666',
            fontSize: '0.95rem',
            lineHeight: '1.6',
            margin: '0 0 32px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Install our official Web App on your iOS or Android device. Track live gold rates, manage your saving scheme installments, and sync your wishlist seamlessly with a single click.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {/* Install Button (Android/Chrome/General) */}
            <button
              onClick={handleInstallClick}
              style={{
                background: 'var(--royal-gold)',
                color: '#ffffff',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '30px',
                fontWeight: '700',
                fontSize: '12px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(212, 138, 148, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
              className="pwa-install-btn"
            >
              📥 Install Web App
            </button>

            {/* Enable Price Alerts Button (Calls requestNotificationPermission under user gesture) */}
            <button
              onClick={requestNotificationPermission}
              style={{
                background: 'var(--peacock-green)',
                color: '#ffffff',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '30px',
                fontWeight: '700',
                fontSize: '12px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(212, 138, 148, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
              className="pwa-alerts-btn"
            >
              🔔 Enable Rate Alerts
            </button>

            {/* iOS Instructions Trigger */}
            <button
              onClick={() => setIsIosHelpOpen(true)}
              style={{
                background: '#ffffff',
                color: 'var(--peacock-green)',
                border: '1px solid rgba(212, 138, 148, 0.3)',
                padding: '14px 28px',
                borderRadius: '30px',
                fontWeight: '700',
                fontSize: '12px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
              className="pwa-ios-btn"
            >
              🍎 iOS Setup Guide
            </button>
          </div>
        </div>

        {/* iOS Helper Modal */}
        {isIosHelpOpen && (
          <div
            onClick={() => setIsIosHelpOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 99999,
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(4px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '16px',
              animation: 'fadeIn 0.2s ease'
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#ffffff',
                border: '1px solid rgba(212, 138, 148, 0.15)',
                borderRadius: '20px',
                maxWidth: '400px',
                width: '100%',
                padding: '30px',
                boxShadow: '0 24px 64px rgba(212, 138, 148, 0.15)',
                position: 'relative',
                textAlign: 'left'
              }}
            >
              <button
                onClick={() => setIsIosHelpOpen(false)}
                style={{
                  position: 'absolute', top: '16px', right: '16px',
                  border: 'none', background: 'none', fontSize: '18px',
                  cursor: 'pointer', color: '#888'
                }}
              >
                ✕
              </button>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                color: 'var(--peacock-green)',
                fontSize: '1.3rem',
                margin: '0 0 16px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                iPhone & iPad Setup
              </h3>
              <ol style={{
                margin: 0, paddingLeft: '20px',
                fontFamily: 'var(--font-sans)', color: '#4a4a4a',
                fontSize: '13px', lineHeight: '1.8'
              }}>
                <li style={{ marginBottom: '10px' }}>Open <strong>Safari</strong> and go to <strong>www.hardikjewellers.in</strong>.</li>
                <li style={{ marginBottom: '10px' }}>Tap the <strong>Share</strong> button (square icon with an arrow pointing up) at the bottom toolbar.</li>
                <li style={{ marginBottom: '10px' }}>Scroll down and select <strong>"Add to Home Screen"</strong> from the list of options.</li>
                <li>Tap <strong>"Add"</strong> at the top right to complete the installation.</li>
              </ol>
            </div>
          </div>
        )}
      </section>

      {/* 8. Footer */}
      <footer className="footer-main">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-brand-title">HARDIK JEWELLERS</span>
            <span className="footer-brand-sub">ULHASNAGAR</span>
          </div>

          <div className="footer-links">
            <Link to="/privacy-policy" className="footer-link-item">PRIVACY POLICY</Link>
            <span className="footer-separator"> | </span>
            <Link to="/terms-of-use" className="footer-link-item">TERMS OF USE</Link>
            <span className="footer-separator"> | </span>
            <Link to="/bis-policy" className="footer-link-item">BIS HALLMARKING POLICY</Link>
            <span className="footer-separator"> | </span>
            <button onClick={() => { setIsAdminOpen(true); handleAdminLogout(); }} className="footer-link-item" style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0, color: 'var(--royal-gold)', fontWeight: 'bold' }}>ADMIN PANEL</button>
          </div>

          <div className="footer-socials">
            <span className="social-label">FOLLOW US ON INSTAGRAM:</span>
            <a href="https://www.instagram.com/hardikjewellers_?igsi=MXBiemI5amFsMml3bw%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="instagram-circle-btn" aria-label="Instagram">
              <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} HARDIK JEWELLERS. All Rights Reserved. Pure BIS Hallmarked Gold & Certified Diamonds.
        </div>
      </footer>

      {/* 8.5. Wishlist Login/Signup & Saved Items Modal Overlay */}
      {isWishlistModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}
        onClick={() => setIsWishlistModalOpen(false)}
        >
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '480px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '24px',
            position: 'relative',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            boxSizing: 'border-box'
          }}
          onClick={(e) => e.stopPropagation()}
          className="hide-scrollbar"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsWishlistModalOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#888'
              }}
            >
              <X style={{ width: '20px', height: '20px' }} />
            </button>

            {/* Modal Heading */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Heart style={{ width: '22px', height: '22px', color: 'var(--peacock-green)', fill: 'var(--peacock-green)' }} />
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.2rem',
                margin: 0,
                color: 'var(--text-dark)',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Saved Wishlist
              </h3>
            </div>

            {/* Auth Tab Container / Persisted Session Greeting */}
            {wishlistUser ? (
              <div style={{
                background: '#fff6f7',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid rgba(212, 138, 148, 0.2)',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxSizing: 'border-box',
                width: '100%'
              }}>
                <div>
                  <p style={{ margin: 0, fontSize: '9px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>
                    SYNCED WISHLIST PROFILE
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', fontWeight: '700', color: 'var(--peacock-green)', fontFamily: 'var(--font-sans)' }}>
                    {wishlistUser}
                  </p>
                </div>
                <button
                  onClick={handleWishlistLogout}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ef4444',
                    fontSize: '10px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div style={{
                background: '#fff6f7',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid rgba(212, 138, 148, 0.15)',
                marginBottom: '24px',
                boxSizing: 'border-box'
              }}>
                {/* Tabs */}
                <div style={{ display: 'flex', borderBottom: '1px solid rgba(212, 138, 148, 0.1)', marginBottom: '16px' }}>
                  <button
                    type="button"
                    onClick={() => setIsWishlistSignUp(false)}
                    style={{
                      flex: 1,
                      background: 'none',
                      border: 'none',
                      borderBottom: !isWishlistSignUp ? '2.5px solid var(--peacock-green)' : '2.5px solid transparent',
                      color: !isWishlistSignUp ? 'var(--peacock-green)' : '#888',
                      padding: '8px 0',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    Log In
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsWishlistSignUp(true)}
                    style={{
                      flex: 1,
                      background: 'none',
                      border: 'none',
                      borderBottom: isWishlistSignUp ? '2.5px solid var(--peacock-green)' : '2.5px solid transparent',
                      color: isWishlistSignUp ? 'var(--peacock-green)' : '#888',
                      padding: '8px 0',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    Sign Up
                  </button>
                </div>
                
                {wishlistError && (
                  <div style={{
                    color: '#e53e3e',
                    background: '#fff5f5',
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: '600',
                    border: '1px solid #fed7d7',
                    textAlign: 'center',
                    marginBottom: '12px'
                  }}>
                    {wishlistError}
                  </div>
                )}
                
                {/* Real Supabase Auth form synced with Saving Scheme */}
                <form onSubmit={handleWishlistAuth} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {isWishlistSignUp && (
                    <>
                      <input 
                        type="text" 
                        name="wishlistName"
                        placeholder="Full Name" 
                        required
                        style={{
                          padding: '10px 14px',
                          fontSize: '12px',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          outline: 'none',
                          fontFamily: 'var(--font-sans)',
                          boxSizing: 'border-box',
                          width: '100%'
                        }}
                      />
                      <input 
                        type="text" 
                        name="wishlistPhone"
                        placeholder="Phone Number" 
                        required
                        style={{
                          padding: '10px 14px',
                          fontSize: '12px',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          outline: 'none',
                          fontFamily: 'var(--font-sans)',
                          boxSizing: 'border-box',
                          width: '100%'
                        }}
                      />
                    </>
                  )}
                  <input 
                    type="email" 
                    name="wishlistEmail"
                    placeholder="Email Address" 
                    required
                    style={{
                      padding: '10px 14px',
                      fontSize: '12px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)',
                      boxSizing: 'border-box',
                      width: '100%'
                    }}
                  />
                  <input 
                    type="password" 
                    name="wishlistPassword"
                    placeholder="Password" 
                    required
                    style={{
                      padding: '10px 14px',
                      fontSize: '12px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)',
                      boxSizing: 'border-box',
                      width: '100%'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={wishlistLoading}
                    style={{
                      background: 'var(--royal-gold)',
                      color: '#ffffff',
                      fontWeight: '700',
                      fontSize: '11px',
                      letterSpacing: '1px',
                      padding: '10px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      marginTop: '4px',
                      boxSizing: 'border-box',
                      width: '100%',
                      opacity: wishlistLoading ? 0.7 : 1
                    }}
                  >
                    {wishlistLoading ? 'Processing...' : (isWishlistSignUp ? 'Create Profile & Sync' : 'Log In & Sync')}
                  </button>
                </form>
              </div>
            )}

            {/* Wishlist Items List Section */}
            <div>
              <h4 style={{
                fontSize: '11px',
                fontWeight: '700',
                color: '#888',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '12px',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                paddingBottom: '6px'
              }}>
                Your Items ({[...dbProducts, ...allProducts].filter(p => likedProducts[p.id]).length})
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '240px', overflowY: 'auto' }} className="hide-scrollbar">
                {[...dbProducts, ...allProducts].filter(p => likedProducts[p.id]).map((product) => (
                  <div 
                    key={product.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px',
                      borderRadius: '8px',
                      border: '1px solid rgba(0,0,0,0.04)',
                      background: '#ffffff',
                      boxSizing: 'border-box'
                    }}
                  >
                    {/* Thumbnail Image */}
                    <img 
                      src={product.url} 
                      alt={product.title}
                      style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px' }}
                    />
                    
                    {/* Item Name */}
                    <div style={{ flexGrow: 1, minWidth: 0 }}>
                      <p style={{ 
                        margin: 0, 
                        fontSize: '11px', 
                        fontWeight: '600', 
                        color: '#1a1a1a',
                        lineHeight: '1.3',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {product.title}
                      </p>
                      <span style={{ fontSize: '9px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {product.subCategory || product.category}
                      </span>
                    </div>

                    {/* Action buttons (WhatsApp inquiry and Trash remove) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <a
                        href={`https://wa.me/919892911531?text=Hello%20HARDIK%20Jewellers,%20I%20am%20interested%20in%20buying%20your%20${encodeURIComponent(product.title)}.%0A%0AProduct%20Link:%20https://www.hardikjewellers.in/?product=${product.id}%20from%20my%20wishlist.`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          background: 'rgba(37, 211, 102, 0.1)',
                          color: '#25D366',
                          borderRadius: '50%',
                          width: '28px',
                          height: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textDecoration: 'none'
                        }}
                        title="Inquire on WhatsApp"
                      >
                        <Phone style={{ width: '13px', height: '13px', fill: '#25D366' }} />
                      </a>
                      <button
                        onClick={() => toggleLike(product.id)}
                        style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          color: '#ef4444',
                          border: 'none',
                          borderRadius: '50%',
                          width: '28px',
                          height: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                        title="Remove"
                      >
                        <X style={{ width: '13px', height: '13px' }} />
                      </button>
                    </div>
                  </div>
                ))}

                {[...dbProducts, ...allProducts].filter(p => likedProducts[p.id]).length === 0 && (
                  <p style={{ margin: '20px 0', fontSize: '11px', color: '#999', textAlign: 'center' }}>
                    Your wishlist is empty.
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 9. Admin Panel Modal Overlay */}
      {isAdminOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content hide-scrollbar">
            <button 
              className="admin-modal-close" 
              onClick={() => setIsAdminOpen(false)}
              aria-label="Close Admin Panel"
            >
              <X className="icon-md" />
            </button>

            {!isAuthed ? (
              /* Passcode Screen */
              <form onSubmit={handleAdminLogin}>
                <h3 className="admin-form-title">ADMIN SECURITY LOGIN</h3>
                <div className="admin-form-group">
                  <label className="admin-form-label">Enter Passcode</label>
                  <input 
                    type="password" 
                    required 
                    className="admin-form-input" 
                    placeholder="Enter admin passcode"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                  />
                  {errorMsg && <p className="admin-error-msg">{errorMsg}</p>}
                </div>
                <button type="submit" className="admin-submit-btn">ACCESS PANEL</button>
              </form>
            ) : (
              /* Live Rates Dashboard Screen */
              <>
                <form onSubmit={handleSaveRates}>
                  <h3 className="admin-form-title">LIVE RATES DASHBOARD</h3>
                


                <div className="admin-form-group">
                  <label className="admin-form-label">22K Gold Rate (₹ per gram)</label>
                  <input 
                    type="number" 
                    required 
                    className="admin-form-input" 
                    value={temp22k}
                    onChange={(e) => setTemp22k(e.target.value)}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">18K Gold Rate (₹ per gram)</label>
                  <input 
                    type="number" 
                    required 
                    className="admin-form-input" 
                    value={temp18k}
                    onChange={(e) => setTemp18k(e.target.value)}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Silver Rate (₹ per gram)</label>
                  <input 
                    type="number" 
                    required 
                    className="admin-form-input" 
                    value={tempSilver}
                    onChange={(e) => setTempSilver(e.target.value)}
                  />
                </div>

                <button type="submit" className="admin-submit-btn">PUBLISH LIVE RATES PUBLICLY</button>
                <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '12px', textAlign: 'center', lineHeight: '1.4' }}>
                  
                </p>
              </form>

              <form onSubmit={handleUploadProduct} style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px dashed var(--royal-gold)' }}>
                <h4 style={{ color: 'white', marginBottom: '16px', fontSize: '14px', letterSpacing: '2px', textAlign: 'center' }}>UPLOAD NEW PRODUCT</h4>
                <div className="admin-form-group">
                  <label className="admin-form-label">Product Title</label>
                  <input type="text" className="admin-form-input" required value={upTitle} onChange={e => setUpTitle(e.target.value)} placeholder="e.g. 22K Gold Antique Bangle" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Category</label>
                  <select className="admin-form-input" value={upCategory} onChange={e => { setUpCategory(e.target.value); setUpSubCategory('ALL'); setUpEarringType('ALL'); }}>
                    {categories.filter(c => c !== 'ALL').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Sub Category</label>
                  <select className="admin-form-input" value={upSubCategory} onChange={e => setUpSubCategory(e.target.value)}>
                    {subCategories[upCategory].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                {upSubCategory === 'EARRINGS' && (
                  <div className="admin-form-group">
                    <label className="admin-form-label">Earring Type</label>
                    <select className="admin-form-input" value={upEarringType} onChange={e => setUpEarringType(e.target.value)}>
                      {earringSubTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                )}
                <div className="admin-form-group" style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ flex: 1 }}>
                    <label className="admin-form-label">Weight</label>
                    <input type="text" className="admin-form-input" value={upWeight} onChange={e => setUpWeight(e.target.value)} placeholder="e.g. 15.5g" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className="admin-form-label">Purity</label>
                    <select className="admin-form-input" value={upPurity} onChange={e => setUpPurity(e.target.value)}>
                      <option value="">Select</option>
                      <option value="24K">24K</option>
                      <option value="22K">22K</option>
                      <option value="18K">18K</option>
                      <option value="92.5 Silver">92.5 Silver</option>
                    </select>
                  </div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Product Image</label>
                  <label style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    border: '2px dashed rgba(212, 138, 148, 0.4)', borderRadius: '12px',
                    padding: '24px', cursor: 'pointer', background: 'rgba(212, 138, 148, 0.05)',
                    transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden', marginTop: '4px'
                  }}>
                    <input type="file" accept="image/*" required style={{ display: 'none' }} onChange={e => setUpImageFile(e.target.files[0])} />
                    {upImageFile ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <img src={URL.createObjectURL(upImageFile)} alt="Preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--royal-gold)' }} />
                        <span style={{ fontSize: '11px', color: 'var(--royal-gold)' }}>Change Image ({upImageFile.name})</span>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <div style={{ fontSize: '24px', color: 'var(--royal-gold)' }}>📸</div>
                        <span style={{ fontSize: '12px', color: '#ccc' }}>Tap to select product image</span>
                      </div>
                    )}
                  </label>
                </div>
                <button type="submit" disabled={isUploading} className="admin-submit-btn" style={{ background: 'var(--royal-gold)', color: 'var(--rich-black)' }}>
                  {isUploading ? 'UPLOADING...' : 'UPLOAD PRODUCT'}
                </button>
              </form>

              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px dashed var(--royal-gold)', textAlign: 'center' }}>
                  <h4 style={{ color: 'white', marginBottom: '12px', fontSize: '14px', letterSpacing: '2px' }}>HARVEST SCHEME SETTINGS</h4>
                  <button 
                    type="button" 
                    onClick={() => window.location.href = '/admin'} 
                    className="admin-submit-btn"
                    style={{ background: 'var(--royal-gold)', color: 'var(--rich-black)', fontWeight: 'bold' }}
                  >
                    OPEN HARVEST ADMIN PANEL
                  </button>
                  <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '8px' }}>
                    (Verify payments, Add manual payments, Upload QR Code)
                  </p>
                </div>

                <button 
                  type="button" 
                  onClick={handleAdminLogout} 
                  className="admin-submit-btn"
                  style={{ background: 'transparent', border: '1px solid var(--royal-gold)', color: 'var(--royal-gold)', marginTop: '24px' }}
                >
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* â”€â”€ Lightbox Modal (White & Pink Premium Brand Colors) â”€â”€ */}
      {lightboxProduct && (
        <div
          onClick={() => setLightboxProduct(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          {/* Modal box */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              border: '1px solid rgba(212, 138, 148, 0.15)',
              borderRadius: '20px',
              maxWidth: '500px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(212, 138, 148, 0.15)',
              position: 'relative'
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxProduct(null)}
              style={{
                position: 'absolute', top: '12px', right: '12px',
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'rgba(0,0,0,0.05)', border: 'none',
                color: '#1a1a1a', fontSize: '18px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 10, lineHeight: 1
              }}
              aria-label="Close"
            >
              ✕
            </button>

            {/* Full image */}
            <img
              src={lightboxProduct.url}
              alt={lightboxProduct.title}
              style={{
                width: '100%',
                maxHeight: '60vh',
                objectFit: 'contain',
                display: 'block',
                background: '#fff6f7'
              }}
            />

            {/* Info panel */}
            <div style={{ padding: '24px', boxSizing: 'border-box' }}>
              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: '1.2rem',
                color: '#1a1a1a', marginBottom: '10px', fontWeight: 700,
                letterSpacing: '0.3px'
              }}>
                {lightboxProduct.title}
              </p>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {lightboxProduct.purity && (
                  <span style={{ fontSize: '11px', color: 'var(--peacock-green)', background: 'rgba(212, 138, 148, 0.08)', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(212, 138, 148, 0.25)', fontWeight: '600', letterSpacing: '0.5px' }}>
                    ✦ {lightboxProduct.purity}
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`https://www.hardikjewellers.in/?product=${lightboxProduct.id}`);
                    alert("Product link copied to clipboard!");
                  }}
                  style={{
                    background: '#fff', border: '1px solid var(--royal-gold)', color: 'var(--royal-gold)',
                    borderRadius: '8px', padding: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title="Copy Share Link"
                >
                  <Share2 size={18} />
                </button>
                <a
                  href={`https://wa.me/919892911531?text=Hello%20HARDIK%20Jewellers,%20I%20am%20interested%20in%20buying%20your%20${encodeURIComponent(lightboxProduct.title)}.%0A%0AProduct%20Link:%20https://www.hardikjewellers.in/?product=${lightboxProduct.id}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
                    background: 'var(--royal-gold)', color: '#ffffff', fontWeight: 700,
                    fontSize: '12px', letterSpacing: '1.2px',
                    padding: '13px 20px', borderRadius: '8px',
                    textDecoration: 'none',
                    boxSizing: 'border-box',
                    transition: 'background 0.2s ease'
                  }}
                  className="lightbox-whatsapp-btn"
                >
                  INQUIRE ON WHATSAPP
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* â”€â”€ PWA Standalone Rate Update Notification â”€â”€ */}
      {showPwaNotification && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            zIndex: 10000,
            background: '#ffffff',
            border: '1px solid rgba(212, 138, 148, 0.25)',
            borderRadius: '16px',
            padding: '16px 20px',
            boxShadow: '0 16px 36px rgba(212, 138, 148, 0.15)',
            maxWidth: '320px',
            width: 'calc(100% - 40px)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            boxSizing: 'border-box'
          }}
        >
          {/* Bell Icon */}
          <div style={{
            background: 'rgba(212, 138, 148, 0.08)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            flexShrink: 0
          }}>
            🔔
          </div>

          <div style={{ flexGrow: 1 }}>
            <h4 style={{
              margin: '0 0 4px',
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              fontWeight: '700',
              color: 'var(--peacock-green)',
              letterSpacing: '0.5px'
            }}>
              LIVE RATE ALERT
            </h4>
            <p style={{
              margin: 0,
              fontSize: '11px',
              color: '#555555',
              lineHeight: '1.4'
            }}>
              Gold rates updated! 22K: <strong>₹{goldRates.gold22k}/g</strong> | Silver: <strong>₹{goldRates.silver}/g</strong>.
            </p>
          </div>

          <button
            onClick={() => setShowPwaNotification(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#999999',
              fontSize: '14px',
              cursor: 'pointer',
              padding: 0,
              lineHeight: 1
            }}
          >
            ✕
          </button>
        </div>
      )}

    </div>
  );
}
