#!/usr/bin/env perl
# 预处理：用 span 占位符替换 img，保存映射
undef $/;
open F, "<", $ARGV[0] or die $!;
my $html = <F>;
close F;
my @imgs;
my $n = 0;
sub make_placeholder {
  my ($attrs, $idx) = @_;
  push @imgs, "<img$attrs>";
  return "<span data-img-replace=\"$idx\"></span>";
}
$html =~ s/<img(\s[^>]*?)>/make_placeholder($1, $n++)/ge;
open O, ">", $ARGV[1] or die $!;
print O $html;
close O;
open M, ">", $ARGV[2] or die $!;
my $tab = chr(9);
my $nl = chr(10);
for my $i (0..scalar(@imgs)-1) {
  print M $i . $tab . $imgs[$i] . $nl;
}
close M;
