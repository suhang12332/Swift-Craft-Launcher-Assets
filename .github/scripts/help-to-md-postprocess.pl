#!/usr/bin/env perl
# 后处理：将 span 占位符改回 img 标签（完全保留原始属性，不做任何修改）
open M, "<", $ARGV[1] or die $!;
my %map = map { chomp; my ($k, $v) = split /\t/, $_, 2; ($k, $v) } <M>;
close M;
open F, "<", $ARGV[0] or die $!;
undef $/;
my $md = <F>;
close F;
$md =~ s/<span data-img-replace="(\d+)"><\/span>/exists $map{$1} ? $map{$1} : ""/ge;
# figure.app-icon 内的图标设为 64x64
$md =~ s/(<figure class="app-icon">\s*)<img\s/$1<img width="64" height="64" /g;
# figure.topicIcon 内的图标设为 48x48（移除原有的 30x30）
$md =~ s/(<figure class="topicIcon">\s*)<img\s/$1<img width="48" height="48" /g;
$md =~ s/(<figure class="topicIcon">[^<]*<img[^>]*)\s+(?:height="30"\s+width="30"|width="30"\s+height="30")([^>]*>)/$1$2/g;
open F, ">", $ARGV[0] or die $!;
print F $md;
close F;
